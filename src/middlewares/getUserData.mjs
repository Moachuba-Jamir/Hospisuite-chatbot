import { multimediaError } from "../services/MultimediaErrorService.mjs";

export const getUserData = (req, res, next) => {
  try {
    console.log("Incoming webhook payload:", JSON.stringify(req.body, null, 2));
    let user = {};

    if (!req.body) {
      throw new Error("Empty request body");
    }

    // Handle message text
    if (req.body.messages && req.body.messages[0]) {
      const message = req.body.messages[0];
      user = {
        sender: message.from,
        msg:
          message.text?.body || message.interactive?.button_reply?.title || "",
        name: req.body.customer_name,
        timestamp: message.timestamp,
        messageId: message.id,
        messageType: message.type,
        contentType: message.type || "unknown", // Get content type from message type
      };
    }
    // Handle interactive buttons, multimedia etc
    else {
      user = {
        sender: req.body.sender,
        msg: req.body.text || req.body.interactive || "",
        name: req.body.customer_name,
        timestamp: req.body.received_at,
        messageId: req.body.message_uuid,
        messageType: req.body.type,
        contentType: req.body.content_type || "unknown", // Get content type from content_type
      };
    }

    // Check if sender exists and content type is text
    if (
      user.sender &&
      (user.contentType?.toLowerCase().includes("text") ||
        user.contentType?.toLowerCase().includes("interactive"))
    ) {
      req.user = user;
      console.log("Extracted user data:", req.user);
      next();
    } else {
      // Handle non-text content type
      console.log("Multimedia content detected:", user.contentType);
      multimediaError(user.sender);
      return res.status(400).json({
        message: "Only text messages are supported",
        contentType: user.contentType,
      });
    }
  } catch (error) {
    console.error("Error in checkUser middleware:", error);
    return res.status(400).json({
      message: "Error processing webhook payload",
      error: error.message,
    });
  }
};

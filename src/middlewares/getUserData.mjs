import { multimediaError } from "../services/MultimediaErrorService.mjs";

export const getUserData = (req, res, next) => {
  try {
    console.log("Incoming webhook payload:", JSON.stringify(req.body, null, 2));
    let user = {};

    if (!req.body) {
      throw new Error("Empty request body");
    }

    // Get the message from the payload
    const message = req.body.messages?.[0];

    if (message) {
      let messageText = "";
      let interactiveType = "";
      // Handle interactive messages (buttons/lists)
      if (message.type === "interactive") {
        if (message.interactive?.button_reply) {
          messageText = message.interactive.button_reply.title;
          interactiveType = "button";
        } else if (message.interactive.list_reply) {
          messageText = message.interactive?.list_reply.title;
          interactiveType = "list";
        }
      } else {
        // Handle regular text messages
        messageText = message.text?.body || "";
      }

      user = {
        sender: message.from,
        msg: messageText,
        name: req.body.customer_name,
        timestamp: message.timestamp,
        messageId: message.id,
        messageType: message.type,
        interactiveType: interactiveType,
        contentType: message.type || "unknown",
      };

      console.log("Processed message:", {
        type: message.type,
        interactiveType,
        messageText,
      });
    }

    // Validate the message
    if (
      user.sender &&
      (user.contentType === "text" ||
        user.contentType === "interactive" ||
        user.messageType === "interactive")
    ) {
      req.user = user;
      console.log("Extracted user data:", req.user);
      next();
    } else {
      console.log(
        "Multimedia or unsupported content detected:",
        user.contentType
      );
      multimediaError(user.sender);
      return res.status(400).json({
        message: "Only text and interactive messages are supported",
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

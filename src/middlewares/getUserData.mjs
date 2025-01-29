
export const getUserData = (req, res, next) => {
  try {
    console.log('Incoming webhook payload:', JSON.stringify(req.body, null, 2));
    let user = {};

    if (req.body) {
      if (req.body.messages && req.body.messages[0]) {
        const message = req.body.messages[0];
        user = {
          sender: message.from,
          msg: message.text?.body || message.interactive?.button_reply?.title || '',
          name: req.body.customer_name,
          timestamp: message.timestamp,
          messageId: message.id,
          messageType: message.type
        };
      } else {
        user = {
          sender: req.body.sender,
          msg: req.body.text || req.body.interactive || '',
          name: req.body.customer_name,
          timestamp: req.body.received_at,
          messageId: req.body.message_uuid,
          messageType: req.body.content_type
        };
      }

      if (user.sender) {
        req.user = user;
        console.log('Extracted user data:', req.user);
        next();
      } else {
        throw new Error('Unable to extract sender information');
      }
    } else {
      throw new Error('Empty request body');
    }
  } catch (error) {
    console.error('Error in checkUser middleware:', error);
    return res.status(400).json({ message: "Error processing webhook payload", error: error.message });
  }
};





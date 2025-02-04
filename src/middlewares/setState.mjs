import {
  indianStates,
  nagalandDistricts,
} from "../utils/statesAndDistricts.mjs";
const greetings = [
  "Hi",
  "Hello",
  "Hey",
  "Howdy",
  "Greetings",
  "Namaste",
  "Hiya",
  "Yo",
  "What's up",
  "Heya",
  "Aloha",
  "Sup",
  "G'day",
  "good day",
  "Hola",
  "Wassup",
  "Namaskar",
  "Namaskaram",
  "Heylo",
  "Hai",
  "Helloji",
  "Hi Hospisuite",
  "Good afternoon",
  "good morning",
  "good evening",
  "afternoon",
  "morning",
  "evening",
  "noon",
  "good day",
];

export const setUserState = (req, res, next) => {
  let userMsg = req.user.msg;
  console.log(`from checkUserMsg Middleware : ${userMsg}`);
  console.log("Message type:", req.user.messageType);
  console.log("Interactive type:", req.user.interactiveType);

  let formattedMsg = userMsg.toLowerCase();
  // Handle interactive messages first (buttons/lists)
  if (req.user.messageType === "interactive") {
    req.userMsg = formattedMsg;
    req.query = ""; // No AI query for interactive messages
    console.log("Processing interactive message:", formattedMsg);

    // If it's a list selection
    if (req.user.interactiveType === "list") {
      const location = formattedMsg;
      // Handle state and district selections
      if (indianStates.some((state) => state.toLowerCase() === location)) {
        // This is a state selection
        req.location = location;
        req.locationType = "state";
        console.log("State selected");
      } else if ( nagalandDistricts.some((district) => district.toLowerCase() === location)) {
        req.location = location;
        req.locationType ="district";
        console.log("District selected");
      } else {
        console.log(`Invalid location selected: ${location}`);
      }
    }
  } else {
    // Handle text messages
    let isGreeting = greetings.some(
      (greet) => formattedMsg.trim() === greet.toLowerCase()
    );

    if (isGreeting) {
      console.log("User sends a greeting message");
      req.userMsg = "greeting";
      req.query = "";
    } else {
      // Check for specific commands
      switch (formattedMsg) {
        case "health schemes":
        case "insurance schemes":
        case "abha registration":
        case "more about pm-jay":
        case "more on hwcs":
        case "health & insurance":
        case "empaneled hospitals":
        case "\u2630 menu":
        case "state":
          req.userMsg = formattedMsg;
          req.query = "";
          break;
        default:
          // If no specific command matched, treat as AI query
          req.userMsg = formattedMsg;
          req.query = formattedMsg;
          console.log(
            "user typed a query, passing control to webhook controller ---->"
          );
          break;
      }
    }
  }

  console.log("Final processed request:", {
    userMsg: req.userMsg,
    query: req.query,
    location: req.location, 
    locationType: req.locationType
  });

  next();
};

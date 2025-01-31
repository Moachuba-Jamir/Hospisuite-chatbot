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
]; // remove after database integration

export const setUserState = (req, res, next) => {
  let userMsg = req.user.msg;
  console.log(`from checkUserMsg Middleware : ${userMsg}`);
  let formattedMsg = userMsg.toLowerCase();
  req.state = formattedMsg;

  // check if it's a greeting message
let isGreeting = greetings.some(
  (greet) => formattedMsg.trim() === greet.toLowerCase()
);


  if (isGreeting) {
    console.log("User sends a greeting message");
    req.state = `greeting`;
    req.query = "";
  } else {
    switch (req.state) {
      case "greeting":
        req.query = "";
        break;
      case "health schemes":
        req.query = "";
        break;
      case "insurance schemes":
        req.query = "";
        break;
      case "abha registration":
        req.query = "";
        break;
      case "more about pm-jay":
        req.query = "";
        break;
      case "more on hwcs":
        req.query = "";
        break;
      case "\u2630 menu":
        req.query = "";
        break;
      default:
        req.query = formattedMsg;
        console.log("user typed a query, passing control to webhook controller ---->");
        break;
    }
  }
  // check if it's an ABHA registration message
  next();
};

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
        console.log("greeting state");
        req.query = "";
        // update the db and retrieve the state value
        break;
      case "health schemes":
        //udpate state in db
        console.log("health schemes");
        req.query = "";
        break;
      case "insurance schemes":
        // update state in db
        console.log("Insurance Schemes ");
        req.query = "";
        break;
      case "abha registration":
        req.query = "";
        // update state in db here
        console.log("abha registration ");
        break;
      case "more about pm-jay":
        //update state in db here
        console.log("More about PM-JAY");
        req.query = "";
        break;
      case "more on hwcs":
        req.query = "";
        break;
      case "\u2630 menu":
        //update state in db here
        req.query = "";
        console.log("Menu");
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

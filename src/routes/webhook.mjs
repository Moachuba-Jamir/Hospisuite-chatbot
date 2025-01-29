import express from "express";
const router = express.Router();

// middlewares
import { getUserData } from "../middlewares/getUserData.mjs";
import { setUserState } from "../middlewares/setState.mjs";

// controller
import { webhookController } from "../controllers/webhookController.mjs";

// webhook router : fires everytime a user sends a message
router.post("/", getUserData, setUserState, webhookController);

export default router;

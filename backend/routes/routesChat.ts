import express from "express";
import { sendMessage, messageHistory } from "../controllers/controllerChat";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/message-history/:matchId", messageHistory);

export default router;

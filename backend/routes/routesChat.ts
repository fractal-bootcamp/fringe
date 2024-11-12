import express from "express";
import { sendMessage } from "../controllers/controllerChat";

const router = express.Router();

router.post("/send", sendMessage);

export default router;

import express from "express";
import { sendLike } from "../controllers/likeController";

const router = express.Router();

router.post("/send", sendLike);

export default router;

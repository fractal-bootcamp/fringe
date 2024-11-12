import express from "express";
import { deleteLike, sendLike } from "../controllers/likeController";

const router = express.Router();

router.post("/send", sendLike);
router.post("/delete", deleteLike);

export default router;

import express from "express";
import { deleteLike, sendLike } from "../controllers/likeController";

const router = express.Router();

router.post("/send", sendLike);
router.delete("/delete", deleteLike);

export default router;

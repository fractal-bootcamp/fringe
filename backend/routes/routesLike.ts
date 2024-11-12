import express from "express";
import { deleteLike, getLikes, sendLike } from "../controllers/likeController";

const router = express.Router();

router.post("/send", sendLike);
router.post("/delete", deleteLike);
router.get("/:userId", getLikes);

export default router;

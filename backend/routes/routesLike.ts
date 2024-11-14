import express from "express";
import { deleteLike, getLikes, addLike } from "../controllers/controllerLike";

const router = express.Router();

router.post("/add", addLike);
router.post("/delete", deleteLike);
router.get("/", getLikes);

export default router;

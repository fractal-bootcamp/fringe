import express from "express";
import { deleteMatch, getAllMatches, getMatchById } from "../controllers/controllerMatch";

const router = express.Router();

router.get("/", getAllMatches);
router.get("/:id", getMatchById);
router.delete("/:id", deleteMatch);

export default router;

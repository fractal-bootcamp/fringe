import express from "express";
import { addMatch, deleteMatch, getAllMatches, getMatchById } from "../controllers/controllerMatch";

const router = express.Router();

router.get("/", getAllMatches);
router.get("/:id", getMatchById);
router.post("/delete", deleteMatch);
router.post("/add", addMatch);

export default router;

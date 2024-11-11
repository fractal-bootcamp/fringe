import express from "express";
import { getAllMatches } from "../controllers/matchController";

const router = express.Router();

// Get all matches
router.get("/matches", getAllMatches);

export default router;

import express from "express";
import { deleteMatch, getAllMatches, getMatchById } from "../controllers/controllerMatch";

const router = express.Router();

router.get("/", getAllMatches);
router.get("/:id", getMatchById);
router.post("/delete", deleteMatch);

export default router;

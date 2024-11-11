import express from "express";
import { getAllApplicants } from "../controllers/applicantController";

const router = express.Router();

// Get all applicants
router.get("/applicants", getAllApplicants);

export default router;

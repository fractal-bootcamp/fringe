import express from "express";
import { getAllApplicants, updateApplicantProfile } from "../controllers/controllerApplicant";

const router = express.Router();

router.get("/applicants", getAllApplicants);
router.post("/update", updateApplicantProfile);

export default router;

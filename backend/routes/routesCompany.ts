import express from "express";
import { getAllCompanies, updateCompanyProfile } from "../controllers/controllerCompany";

const router = express.Router();

router.get("/companies", getAllCompanies);
router.post("/update", updateCompanyProfile);

export default router;

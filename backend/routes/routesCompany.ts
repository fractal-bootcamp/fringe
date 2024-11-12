import express from "express";
import { getAllCompanies } from "../controllers/controllerCompany";

const router = express.Router();

// Get user by ID
router.get("/companies", getAllCompanies);

export default router;

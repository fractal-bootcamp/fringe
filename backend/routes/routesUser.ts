import express from "express";
import { getUserById } from "../controllers/userController";

const router = express.Router();

// Get user by ID
router.get("/:id", getUserById);

export default router;

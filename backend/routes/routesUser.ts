import express from "express";
import { getAllUsers, getUserById, updateUserProfile, createUser } from "../controllers/controllerUser";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/update/:id", updateUserProfile);

export default router;

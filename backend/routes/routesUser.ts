import express from "express";
import { getAllUsers, getUserById } from "../controllers/controllerUser";

const router = express.Router();

router.get("/:id", getUserById);
router.get("/", getAllUsers);

export default router;

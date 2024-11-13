import express from "express";
import { getAllUsers, getUserById, updateUserProfile, getSignedPhotoUrl, updateUserPhoto, createUser } from "../controllers/controllerUser";
import upload from "../middleware/upload";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/update/:id", updateUserProfile);
router.post("/update/:id/photo", upload.single('photo'), updateUserPhoto);
router.get("/:id/photo/:photoId", getSignedPhotoUrl);

export default router;

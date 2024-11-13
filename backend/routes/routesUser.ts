import express from "express";
import { getAllUsers, getUserById, updateUserProfile, updateUserPhoto, getSignedPhotoUrl } from "../controllers/controllerUser";
import upload from "../middleware/upload";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/update/:id", updateUserProfile);
router.post("/update/:id/photo", upload.single('photo'), updateUserPhoto);
router.get("/:id/photo/:photoId", getSignedPhotoUrl);

export default router;

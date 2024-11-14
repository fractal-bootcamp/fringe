import express from "express";
import { getAllUsers, getUserById, updateUserProfile, getSignedPhotoUrl, updateUserPhoto } from "../controllers/controllerUser";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", getUserById);
router.put("/me", updateUserProfile);
router.put("/me/photo", upload.single('photo'), updateUserPhoto);
router.get("/photos/:photoId", getSignedPhotoUrl);

export default router;

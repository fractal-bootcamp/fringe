import express from "express";
import { getAllUsers, getUserById, updateUserProfile, getSignedPhotoUrl, updateUserPhoto, createUser } from "../controllers/controllerUser";
import upload from "../middleware/upload";
import { requireAuth } from "@clerk/express";
import { identifyUserMiddleware } from "../middleware/identifyUserMiddleware";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getCurrentUser", requireAuth(), identifyUserMiddleware, getUserById);
router.post("/updateProfile",requireAuth(), identifyUserMiddleware, updateUserProfile);
router.post("/updatePhoto", upload.single('photo'), requireAuth(), identifyUserMiddleware, updateUserPhoto);
router.get("/photos/:photoId",requireAuth(),identifyUserMiddleware, getSignedPhotoUrl);
router.post("/createUser", createUser);

export default router;

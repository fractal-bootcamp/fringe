import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  getSignedPhotoUrl,
  updateUserPhoto,
  createUser,
  getUser,
  getAllApplicantUsers,
  getAllCompanyUsers,
} from "../controllers/controllerUser";
import upload from "../middleware/upload";

const router = express.Router();

router.get("/getAllUsers", getAllUsers);
router.get("/getCurrentUser", getUserById);
router.post("/getUser", getUser);
router.post("/updateProfile", updateUserProfile);
router.post("/updatePhoto", upload.single("photo"), updateUserPhoto);
router.get("/photos/:photoId", getSignedPhotoUrl);
router.post("/createUser", createUser);

// Get all applicant/company users
router.get("/getAllApplicantUsers", getAllApplicantUsers);
router.get("/getAllCompanyUsers", getAllCompanyUsers);

export default router;

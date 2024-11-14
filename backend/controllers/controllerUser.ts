import type { Response } from "express";
import type { Request } from "../middleware/identifyUserMiddleware";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";
import { uploadToS3 } from "../utils/s3";
import { getSignedReadUrl } from "../utils/s3";
import { clerkClient } from "@clerk/express";
import { getAuth } from "@clerk/express";

export const getUserById = logging("getUserById", false, async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized - No user" });
    return;
  }
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        applicantProfile: {
          include: {
            prompts: true,
          },
        },
        companyProfile: {
          include: {
            prompts: true,
          },
        },
        matches: {
          include: {
            users: true,
          },
        },
        receivedLikes: {
          include: {
            fromUser: true,
          },
        },
        messages: true,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get user" });
  }
});

export const getAllUsers = logging("getAllUsers", false, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        applicantProfile: {
          include: {
            prompts: true,
          },
        },
        companyProfile: {
          include: {
            prompts: true,
          },
        },
        matches: true,
        messages: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to get all users" });
  }
});

export const updateUserProfile = logging(
  "updateUserProfile",
  false,
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized - No user" });
      return;
    }
    try {
      const userId = req.user.id;
      const updatedData = req.body;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updatedData,
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user profile" });
    }
  }
);

export const updateUserPhoto = logging(
  "updateUserPhoto",
  false,
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized - No user" });
      return;
    }
    const userId = req.user.id;

    if (!req.file) {
      res.status(400).json({ error: "No photo uploaded" });
      return;
    }
    try {
      const fileBuffer = req.file.buffer;
      const fileName = req.file.originalname;

      const key = `${userId}-${Date.now()}-${fileName}`;
      const uploadedPhotoKey = await uploadToS3(fileBuffer, key);

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { profilePhotoIds: [uploadedPhotoKey] },
      });

      const signedUrl = await getSignedReadUrl(uploadedPhotoKey);

      res.status(200).json({
        photoUrl: signedUrl,
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to update user photo" });
    }
  }
);

export const getSignedPhotoUrl = logging(
  "getSignedPhotoUrl",
  false,
  async (req: Request, res: Response) => {
    const { photoId } = req.params;
    try {
      const signedUrl = await getSignedReadUrl(photoId);
      res.status(200).json({ url: signedUrl });
    } catch (error) {
      res.status(500).json({ error: "Failed to get signed photo url" });
    }
  }
);

export const createUser = logging("createUser", false, async (req: Request, res: Response) => {
  const auth = getAuth(req);
  console.log("auth", auth);
  if (!auth.userId) {
    res.status(401).json({ error: "Unauthorized - No userId" });
    return;
  }
  try {
    const clerkUser = await clerkClient.users.getUser(auth.userId);

    try {
      const result = await prisma.$transaction(async (prisma) => {
        const user = await prisma.user.create({
          data: {
            clerkId: auth.userId,
            name: clerkUser.username || "New User",
            location: "",
            profilePhotoIds: [],
            profileType: req.body.profileType,
          },
        });

        if (req.body.profileType === "applicant") {
          await prisma.applicant.create({
            data: {
              userId: user.id,
              yearsOfExperience: 0,
              educationalExperiences: "",
              professionalExperiences: "",
              portfolioUrl: "",
            },
          });
        } else if (req.body.profileType === "company") {
          await prisma.company.create({
            data: {
              userId: user.id,
              yearsOfOperation: 0,
              employeeCount: 0,
              industry: "software",
              fundingRound: "seed",
            },
          });
        }
        res.status(200).json({ message: "User created", user: user });

        return user;
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user in database" });
    }
    
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
  
});

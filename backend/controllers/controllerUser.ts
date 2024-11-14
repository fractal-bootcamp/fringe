import type { Request, Response } from "express";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";
import { uploadToS3 } from "../utils/s3";
import { getSignedReadUrl } from "../utils/s3";
import { clerkClient } from "@clerk/express";
import { getAuth } from "@clerk/express";

export const getUserById = logging("getUserById", false, async (req: Request, res: Response) => {
  const userId = req.user.id;

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
});

export const getAllUsers = logging("getAllUsers", false, async (req: Request, res: Response) => {
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
});

export const updateUserProfile = logging(
  "updateUserProfile",
  false,
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    const updatedData = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });
    res.status(200).json(updatedUser);
  }
);

export const updateUserPhoto = logging("updateUserPhoto", false, async (req: Request, res: Response) => {
  const userId = req.user.id;
  
  if (!req.file) {
    return res.status(400).json({ error: 'No photo uploaded' });
  }

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
});

export const getSignedPhotoUrl = logging(
  "getSignedPhotoUrl",
  false,
  async (req: Request, res: Response) => {
    const { photoId } = req.params;
    const signedUrl = await getSignedReadUrl(photoId);
    res.status(200).json({ url: signedUrl });
  }
);

export const createUser = logging("createUser", false, async (req: Request, res: Response) => {
  try {
    const auth = getAuth(req);
    console.log("auth", auth);
    if (!auth.userId) {
      return res.status(401).json({ error: "Unauthorized - No userId" });
    }

    const clerkUser = await clerkClient.users.getUser(auth.userId);
    
    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          clerkId: auth.userId,
          name: clerkUser.username || "New User",
          location: "",
          profilePhotoIds: [],
          profileType: req.body.profileType,
        }
      });

      if (req.body.profileType === 'applicant') {
        await prisma.applicant.create({
          data: {
            userId: user.id,
            yearsOfExperience: 0,
            educationalExperiences: "",
            professionalExperiences: ""
          }
        });
      } else if (req.body.profileType === 'company') {
        await prisma.company.create({
          data: {
            userId: user.id,
            yearsOfOperation: 0,
            employeeCount: 0,
            industry: 'software',
            fundingRound: 'seed'
          }
        });
      }

      return user;
    });

    console.log(`Created new user with clerkId: ${auth.userId}`);
    res.status(200).json({ message: "User created", user: result });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: "Failed to create user" });
  }
});



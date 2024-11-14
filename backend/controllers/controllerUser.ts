import type { Request, Response } from "express";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";
import { uploadToS3 } from "../utils/s3";
import { getSignedReadUrl } from "../utils/s3";

export const getUserById = logging("getUserById", false, async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { userId } = req.user.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
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
    const { id } = req.user.id;
    const updatedData = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });
    res.status(200).json(updatedUser);
  }
);

export const updateUserPhoto = logging("updateUserPhoto", false, async (req: Request, res: Response) => {
  const { id } = req.user.id;
  
  if (!req.file) {
    return res.status(400).json({ error: 'No photo uploaded' });
  }

  const fileBuffer = req.file.buffer;
  const fileName = req.file.originalname;
  
  const key = `${id}-${Date.now()}-${fileName}`;
  const uploadedPhotoKey = await uploadToS3(fileBuffer, key);

  const updatedUser = await prisma.user.update({
    where: { id },
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

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // Add your user creation logic here
    // For example, using Prisma:
    const user = await prisma.user.create({
      data: userData,
    });
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

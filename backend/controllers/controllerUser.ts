import type { Response } from "express";
import type { Request } from "../middleware/identifyUserMiddleware";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";
import { uploadToS3 } from "../utils/s3";
import { getSignedReadUrl } from "../utils/s3";

// TODO: rename to getCurrentUser
export const getUserById = logging("getUserById", false, async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized - No user" });
    return;
  }
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
          messages: true,
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

export const getUser = logging("getUser", false, async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized - No user" });
    return;
  }
  const { userId } = req.body;

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
          messages: true,
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

export const getAllApplicantUsers = logging(
  "getAllApplicantUsers",
  false,
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      where: {
        profileType: "applicant",
      },
      include: {
        applicantProfile: {
          include: {
            prompts: true,
          },
        },
        matches: true,
        messages: true,
      },
    });
    res.status(200).json(users);
  }
);

export const getAllCompanyUsers = logging(
  "getAllApplicantUsers",
  false,
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      where: {
        profileType: "company",
      },
      include: {
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
  }
);

export const updateUserProfile = logging(
  "updateUserProfile",
  false,
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized - No user" });
      return;
    }

    const userId = req.user.id;
    const updatedData = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });
    res.status(200).json(updatedUser);
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
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized - No user" });
    return;
  }

  const result = await prisma.$transaction(async (prisma) => {
    // Update existing user with provided data
    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: {
        name: req.body.name,
        profileType: req.body.profileType,
      },
    });

    // Create corresponding profile based on type
    if (req.body.profileType === "applicant") {
      await prisma.applicant.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          yearsOfExperience: 0,
          educationalExperiences: "",
          professionalExperiences: "",
          portfolioUrl: "",
        },
      });
    } else if (req.body.profileType === "company") {
      await prisma.company.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          yearsOfOperation: 0,
          employeeCount: 0,
          industry: "software",
          fundingRound: "seed",
        },
      });
    }

    const finalUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        applicantProfile: true,
        companyProfile: true,
      },
    });

    if (!finalUser) {
      throw new Error("User not found after creation");
    }

    return finalUser;
  });

  res.status(200).json({ user: result });
});

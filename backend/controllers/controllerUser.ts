import type { Request, Response } from "express";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

export const getUserById = logging("getUserById", false, async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
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
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });
    res.status(200).json(updatedUser);
  }
);

import type { Request, Response } from "express";
import prisma from "../prisma/client";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      applicantProfile: true,
      companyProfile: true,
      matches: true,
      messages: true,
    },
  });
  res.status(200).json(user);
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: {
      applicantProfile: true,
      companyProfile: true,
      matches: true,
      messages: true,
    },
  });
  res.status(200).json(users);
};

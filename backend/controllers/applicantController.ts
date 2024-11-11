import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllApplicants = async (req: Request, res: Response) => {
  const applicants = await prisma.applicant.findMany();
  res.status(200).json(applicants);
};

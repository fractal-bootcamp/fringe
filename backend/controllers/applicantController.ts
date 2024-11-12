import type { Request, Response } from "express";
import prisma from "../prisma/client";
export const getAllApplicants = async (req: Request, res: Response) => {
  const applicants = await prisma.applicant.findMany({
    include: {
      prompts: true,
    },
  });
  res.status(200).json(applicants);
};

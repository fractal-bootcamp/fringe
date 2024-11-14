import type { Request, Response } from "express";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

export const getAllApplicants = logging(
  "getAllApplicants",
  false,
  async (req: Request, res: Response) => {
    const applicants = await prisma.applicant.findMany({
      include: {
        prompts: true,
      },
    });
    res.status(200).json(applicants);
  }
);

export const updateApplicantProfile = logging(
  "updateApplicantProfile",
  false,
  async (req: Request, res: Response) => {
    const { id } = req.user.id;
    const updatedData = req.body;

    const updatedApplicant = await prisma.applicant.update({
      where: { id },
      data: updatedData,
    });
    res.status(200).json(updatedApplicant);
  }
);

import type { Response } from "express";
import type { Request } from "../middleware/identifyUserMiddleware";
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
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized - No user" });
      return;
    }
    const { applicantId, ...data } = req.body;

    const updatedApplicant = await prisma.applicant.upsert({
      where: { userId: req.user.id },
      update: data,
      create: {
        userId: req.user.id,
        ...data,
      },
    });

    res.status(200).json(updatedApplicant);
  }
);

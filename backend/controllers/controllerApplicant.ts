import type { Response } from "express";
import type { Request } from "../middleware/identifyUserMiddleware";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

export const getAllApplicants = logging(
  "getAllApplicants",
  false,
  async (req: Request, res: Response) => {
    try {
      const applicants = await prisma.applicant.findMany({
        include: {
          prompts: true,
        },
      });
      res.status(200).json(applicants);
    } catch (error) {
      res.status(500).json({ error: "Failed to get applicants" });
    }
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

    const updatedApplicant = await prisma.applicant.update({
      where: { id: applicantId },
      data: data,
    });

    res.status(200).json(updatedApplicant);
  }
);

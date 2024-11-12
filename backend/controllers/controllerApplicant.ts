import { PrismaClient } from "@prisma/client";
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

import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

export const getAllCompanies = logging(
  "getAllCompanies",
  false,
  async (req: Request, res: Response) => {
    const companies = await prisma.company.findMany({
      include: {
        prompts: true,
      },
    });
    res.status(200).json(companies);
  }
);

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

export const updateCompanyProfile = logging(
  "updateCompanyProfile",
  false,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedCompany = await prisma.company.update({
      where: { id },
      data: updatedData,
    });
    res.status(200).json(updatedCompany);
  }
);

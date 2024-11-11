import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllCompanies = async (req: Request, res: Response) => {
  const companies = await prisma.company.findMany({
    include: {
      prompts: true,
    },
  });
  res.status(200).json(companies);
};

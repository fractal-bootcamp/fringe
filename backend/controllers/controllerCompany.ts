import type { Response } from "express";
import type { Request } from "../middleware/identifyUserMiddleware";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

export const getAllCompanies = logging(
  "getAllCompanies",
  false,
  async (req: Request, res: Response) => {
    try {
      const companies = await prisma.company.findMany({
        include: {
          prompts: true,
        },
      });
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to get companies" });
    }
  }
);

export const updateCompanyProfile = logging(
  "updateCompanyProfile",
  false,
  async (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized - No user" });
      return;
    }
    const { companyId, ...data } = req.body;

    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: data,
    });
    res.status(200).json(updatedCompany);
  }
);

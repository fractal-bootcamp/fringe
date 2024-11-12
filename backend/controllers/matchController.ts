import type { Request, Response } from "express";
import prisma from "../prisma/client";

export const getAllMatches = async (req: Request, res: Response) => {
  const matches = await prisma.match.findMany({
    include: {
      users: true,
      messages: true,
    },
  });
  res.status(200).json(matches);
};

export const getMatchById = async (req: Request, res: Response) => {
  const match = await prisma.match.findUnique({
    where: { id: req.params.id },
    include: {
      users: true,
      messages: true,
    },
  });
  res.status(200).json(match);
};

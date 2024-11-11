import type { Request, Response } from "express";
import prisma from "../prisma/client";
import type { User } from "@prisma/client";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  res.status(200).json(user);
};

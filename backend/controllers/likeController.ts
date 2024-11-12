import type { Request, Response } from "express";
import prisma from "../prisma/client";

export const sendLike = async (req: Request, res: Response) => {
  const { fromUserId, toUserId, section, content } = req.body;
  await prisma.like.create({
    data: {
      fromUserId,
      toUserId,
      section,
      content,
    },
  });
  res.status(200);
};

export const deleteLike = async (req: Request, res: Response) => {
  const { id } = req.body;
  await prisma.like.delete({
    where: { id },
  });
  res.status(200);
};

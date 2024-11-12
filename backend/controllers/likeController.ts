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

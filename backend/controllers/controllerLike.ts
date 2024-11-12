import type { Request, Response } from "express";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

export const getLikes = logging("getLikes", false, async (req: Request, res: Response) => {
  const { userId } = req.params;
  const likes = await prisma.like.findMany({
    where: { toUserId: userId },
  });
  res.status(200).json({ likes });
});

export const sendLike = logging("sendLike", false, async (req: Request, res: Response) => {
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
});

export const deleteLike = logging("deleteLike", false, async (req: Request, res: Response) => {
  const { id } = req.body;
  console.log("deleteLike", id);
  await prisma.like.delete({
    where: { id },
  });
  res.status(200);
});

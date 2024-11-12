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

  // Find if the toUserId has liked the fromUserId
  const isMatch = await prisma.like.findFirst({
    where: {
      fromUserId: toUserId,
      toUserId: fromUserId,
    },
  });

  if (isMatch) {
    await prisma.match.create({
      data: {
        users: { connect: [{ id: fromUserId }, { id: toUserId }] },
      },
    });
  }

  res.status(200);
};

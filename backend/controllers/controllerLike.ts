import type { Response } from "express";
import type { Request } from "../middleware/identifyUserMiddleware";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

export const getLikes = logging("getLikes", false, async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized - No user" });
    return;
  }
  const userId = req.user.id;
  const likes = await prisma.like.findMany({
    where: { toUserId: userId },
  });
  res.status(200).json({ likes });
});

export const addLike = logging("addLike", false, async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized - No user" });
    return;
  }
  const { fromUserId, toUserId } = req.body;

  await prisma.like.create({
    data: {
      fromUserId,
      toUserId,
    },
  });
  res.status(200);
});

export const deleteLike = logging("deleteLike", false, async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized - No user" });
    return;
  }
  const { likeId } = req.body;

  const response = await prisma.like.delete({
    where: { id: likeId },
  });

  res.status(200).json(response);
});

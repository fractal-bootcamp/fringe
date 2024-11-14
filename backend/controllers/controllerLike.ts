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
  try {
    const likes = await prisma.like.findMany({
      where: { toUserId: userId },
    });
    res.status(200).json({ likes });
  } catch (error) {
    res.status(500).json({ error: "Failed to get likes" });
  }
});

export const addLike = logging("addLike", false, async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized - No user" });
    return;
  }
  const { fromUserId, toUserId } = req.body;
  try {
    await prisma.like.create({
      data: {
      fromUserId,
      toUserId,
    },
  });
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: "Failed to add like" });
  }
});

export const deleteLike = logging("deleteLike", false, async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized - No user" });
    return;
  }
  const likeId = req.body.id;
  try {
    await prisma.like.delete({
    where: { id: likeId },
    });
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete like" });
  }
});

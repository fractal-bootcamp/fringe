import type { Response } from "express";
import type { Request } from "../middleware/identifyUserMiddleware";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

export const getAllMatches = logging(
  "getAllMatches",
  false,
  async (req: Request, res: Response) => {
    try {
      const matches = await prisma.match.findMany({
        include: {
          users: true,
        messages: true,
      },
    });
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ error: "Failed to get all matches" });
    }
  }
);

export const addMatch = logging("addMatch", false, async (req: Request, res: Response) => {
  const { userId1, userId2 } = req.body;
  try {
    const match = await prisma.match.create({
      data: { users: { connect: [{ id: userId1 }, { id: userId2 }] } },
    });
  const matchWithUsers = await prisma.match.findUnique({
    where: { id: match.id },
    include: { users: true },
  });
    res.status(200).json(matchWithUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to add match" });
  }
});

export const getMatchById = logging("getMatchById", false, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const match = await prisma.match.findUnique({
      where: { id: id },
    include: {
      users: true,
      messages: true,
    },
  });
    res.status(200).json(match);
  } catch (error) {
    res.status(500).json({ error: "Failed to get match by id" });
  }
});

export const deleteMatch = logging("deleteMatch", false, async (req: Request, res: Response) => {
  const { id } = req.params;

  // Delete all related messages first
  try {
    await prisma.message.deleteMany({
      where: { matchId: id },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete messages" });
  }

  // Now delete the match
  try {
    await prisma.match.delete({
      where: { id: id },
    });

    res.status(200).send("Match deleted");
  } catch (error) {
    res.status(500).json({ error: "Failed to delete match" });
  }
});

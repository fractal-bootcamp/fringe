import type { Request, Response } from "express";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

export const getAllMatches = logging(
  "getAllMatches",
  false,
  async (req: Request, res: Response) => {
    const matches = await prisma.match.findMany({
      include: {
        users: true,
        messages: true,
      },
    });
    res.status(200).json(matches);
  }
);

export const addMatch = logging("addMatch", false, async (req: Request, res: Response) => {
  const { userId1, userId2 } = req.body;
  const match = await prisma.match.create({
    data: { users: { connect: [{ id: userId1 }, { id: userId2 }] } },
  });
  const matchWithUsers = await prisma.match.findUnique({
    where: { id: match.id },
    include: { users: true },
  });
  res.status(200).json(matchWithUsers);
});

export const getMatchById = logging("getMatchById", false, async (req: Request, res: Response) => {
  const match = await prisma.match.findUnique({
    where: { id: req.params.id },
    include: {
      users: true,
      messages: true,
    },
  });
  res.status(200).json(match);
});

export const deleteMatch = logging("deleteMatch", false, async (req: Request, res: Response) => {
  const { id } = req.body;

  // Delete all related messages first
  await prisma.message.deleteMany({
    where: { matchId: id },
  });

  // Now delete the match
  await prisma.match.delete({
    where: { id: id },
  });

  console.log("Match deleted");

  res.status(200).send("Match deleted");
});

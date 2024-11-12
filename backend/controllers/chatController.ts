import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const sendMessage = async (req: Request, res: Response) => {
  const { message, matchId, senderId } = req.body;
  const newMessage = await prisma.message.create({
    data: {
      content: message,
      matchId,
      senderId,
    },
  });
  res.status(200).json(newMessage);
};

export const messageHistory = async (req: Request, res: Response) => {
  const { matchId } = req.params;
  const messages = await prisma.message.findMany({
    where: { matchId },
    orderBy: { createdAt: 'asc' },
  });
  res.status(200).json(messages);
};

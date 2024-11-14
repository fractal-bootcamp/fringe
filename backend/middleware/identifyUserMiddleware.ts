import { type NextFunction, type Request, type Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import prisma from "../prisma/client";

export async function identifyUserMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = getAuth(req);

  let clerkUser = await clerkClient.users.getUser(auth.userId);
  console.log('Clerk user found:', clerkUser.id);

  let user = await prisma.user.findUnique({
    where: {
      clerkId: auth.userId
    }
  });
  
  req.user = user;
  next();
} 
import { type NextFunction, type Request as ExpressRequest, type Response } from "express";
import { getAuth} from "@clerk/express";
import prisma from "../prisma/client";


export interface Request extends ExpressRequest {
  user?: {
    id: string;
    clerkId: string;
    name: string;
    location: string;
    profilePhotoIds: string[];
    createdAt: Date;
    updatedAt: Date;
    profileType: "applicant" | "company";
  };
}

export const identifyUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) {
      res.status(401).json({ error: "Unauthorized - No auth token" });
      return;
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: auth.userId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: auth.userId,
          name: "New User",
          location: "",
          profilePhotoIds: [],
          profileType: "applicant", // Default type, wil be updated later
        },
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}; 
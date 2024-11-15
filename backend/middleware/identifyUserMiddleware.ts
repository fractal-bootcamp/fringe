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

    if (auth.userId) {
      let user = await prisma.user.findUnique({
        where: {
          clerkId: auth.userId
        }
      });
      
      if (!user) {
        user = await prisma.user.create({
          data: {
            clerkId: auth.userId,
            name: "New User",
            location: "",
            profileType: req.body.profileType,
          },
        });
      }
      
      req.user = user;
    }

    next();
  } catch (error) {
    next(error);
  }
}; 
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
      try {
        let user = await prisma.user.findUnique({
          where: {
            clerkId: auth.userId
          }
          });
        if (!user) {
            res.status(401).json({ error: "User not found in database" });
            next();
         }
         else {
          req.user = user;
         }
      } catch (error) {
        res.status(401).json({ error: "Unauthorized - No userId" });
        next();
      }
    }




    next();
  } catch (error) {
    next(error);
  }
}; 
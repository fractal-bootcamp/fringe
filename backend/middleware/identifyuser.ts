import { clerkClient, getAuth } from '@clerk/express';
import type { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';

export default async function identifyUserMiddleware(req: Request, res: Response, next: NextFunction) {
    const { userId } = getAuth(req);
    console.log(userId);

    const clerkUser = await clerkClient.users.getUser(userId);
    let user = await prisma.user.findUnique({
        where:{
            clerkId:userId
        }
    });

    if (!user){
        user = await prisma.user.create({
            data: {
                clerkId: userId,
                name: clerkUser.username ?? "",
                location: "",
                profileType: "applicant",
                profilePhotoIds: [""],
            }
        });
    };

    req.user = user;
    next();

};
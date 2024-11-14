// App setup
import express, { type NextFunction } from "express";
import type { Request, Response } from 'express';

import cors from "cors";
import routesUser from "./routes/routesUser";
import routesCompany from "./routes/routesCompany";
import routesApplicant from "./routes/routesApplicant";
import routesMatches from "./routes/routesMatch";
import routesChat from "./routes/routesChat";
import routesLike from "./routes/routesLike";
import { requireAuth, clerkMiddleware, getAuth, clerkClient } from "@clerk/express";
import prisma from "./prisma/client";


const app = express();
const PORT = process.env.PORT || 3005;



app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.use(clerkMiddleware());

async function identifyUserMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = getAuth(req);
    console.log('Auth details:', {
      userId: auth.userId,
      sessionId: auth.sessionId,
      session: auth.session,
    });

    if (!auth.userId) {
      console.log('No userId found in auth');
      return res.status(401).json({ error: "Unauthorized - No userId" });
    }

    let clerkUser;
    try {
      clerkUser = await clerkClient.users.getUser(auth.userId);
      console.log('Clerk user found:', clerkUser.id);
    } catch (error) {
      console.error("Error fetching Clerk user:", error);
      return res.status(401).json({ error: "Invalid or expired session" });
    }

    try {
      let user = await prisma.user.findUnique({
        where: {
          clerkId: auth.userId
        }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            clerkId: auth.userId,
            name: clerkUser.username || "New User",
            location: "",
            profilePhotoIds: [],
            profileType: "applicant",
            applicantProfile: {
              create: {
                yearsOfExperience: 0,
                educationalExperiences: "",
                professionalExperiences: ""
              }
            }
          }
        });
        console.log(`Created new user with clerkId: ${auth.userId}`);
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Database operation failed:", error);
      if (error.code === 'P2002') {
        return res.status(409).json({ 
          error: "User already exists with this clerk ID" 
        });
      }
      return res.status(500).json({ 
        error: "Failed to process user information" 
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({ 
      error: "Internal server error in authentication process",
      details: error.message 
    });
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Routes
app.use("/applicant", requireAuth(), identifyUserMiddleware, routesApplicant);
app.use("/chat", requireAuth(), identifyUserMiddleware, routesChat);
app.use("/company", requireAuth(), identifyUserMiddleware, routesCompany);
app.use("/like", requireAuth(), identifyUserMiddleware, routesLike);
app.use("/match", requireAuth(), identifyUserMiddleware, routesMatches);
app.use("/user", requireAuth(), identifyUserMiddleware, routesUser);

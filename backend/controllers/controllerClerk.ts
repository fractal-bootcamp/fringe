import type { Request, Response } from "express";
import prisma from "../prisma/client";
import { logging } from "../utils/logging";

// const clerkSigningSecret = process.env.CLERK_SIGNING_SECRET;

export const signUp = logging("signUp", false, async (req: Request, res: Response) => {
  const body = req.body;

  if (body.type === "user.created") {
    const userId = body.data.id;
    // const email = event.data.email_addresses[0].email_address;

    // Create a new user in your database
    await prisma.user.create({
      data: {
        clerkId: userId,
        name: body.data.first_name + " " + body.data.last_name,
        location: body.data.location,
        profileType: "applicant",
        profilePhotoIds: [body.data.image_url],
      },
    });
    res.status(200).json({ message: "Sign up successful" });
  }
  res.status(400).json({ message: "Invalid event type" });
});

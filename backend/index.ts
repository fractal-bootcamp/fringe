// App setup
import express from "express";
import cors from "cors";
import routesUser from "./routes/routesUser";
import routesCompany from "./routes/routesCompany";
import routesApplicant from "./routes/routesApplicant";
import routesMatches from "./routes/routesMatch";
import routesChat from "./routes/routesChat";
import routesLike from "./routes/routesLike";
import routesClerk from "./routes/routesClerk";
import { requireAuth, clerkMiddleware } from "@clerk/express";
import identifyUserMiddleware from "./middleware/identifyuser";


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
app.use(identifyUserMiddleware);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Routes
app.use("/clerk", routesClerk);
app.use("/applicant", requireAuth(), routesApplicant);
app.use("/chat", requireAuth(), routesChat);
app.use("/company", requireAuth(), routesCompany);
app.use("/like", requireAuth(), routesLike);
app.use("/match", requireAuth(), routesMatches);
app.use("/user", requireAuth(), routesUser);

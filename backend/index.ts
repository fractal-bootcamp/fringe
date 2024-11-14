// App setup
import express from "express";
import cors from "cors";
import routesUser from "./routes/routesUser";
import routesCompany from "./routes/routesCompany";
import routesApplicant from "./routes/routesApplicant";
import routesMatches from "./routes/routesMatch";
import routesChat from "./routes/routesChat";
import routesLike from "./routes/routesLike";
import { requireAuth, clerkMiddleware } from "@clerk/express";
import { identifyUserMiddleware } from "./middleware/identifyUserMiddleware";


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

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Routes
app.use("/applicant", requireAuth(), identifyUserMiddleware, routesApplicant);
app.use("/chat", requireAuth(), identifyUserMiddleware, routesChat);
app.use("/company", requireAuth(), identifyUserMiddleware, routesCompany);
app.use("/like", requireAuth(), identifyUserMiddleware, routesLike);
app.use("/match", requireAuth(), identifyUserMiddleware, routesMatches);
app.use("/user/createUser", routesUser);
app.use("/user", requireAuth(), identifyUserMiddleware, routesUser);

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

const app = express();
const PORT = process.env.PORT || 3005;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Routes
app.use("/applicant", routesApplicant);
app.use("/chat", routesChat);
app.use("/clerk", routesClerk);
app.use("/company", routesCompany);
app.use("/like", routesLike);
app.use("/match", routesMatches);
app.use("/user", routesUser);

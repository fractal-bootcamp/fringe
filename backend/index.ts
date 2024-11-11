// App setup
import express from "express";
import routesUser from "./routes/routesUser";
import routesCompany from "./routes/routesCompany";
import routesApplicant from "./routes/routesApplicant";

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Routes
app.use("/user", routesUser);
app.use("/company", routesCompany);
app.use("/applicant", routesApplicant);

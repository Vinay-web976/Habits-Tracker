import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import habitRoutes from "./routes/habitsRoutes.js";
import dailyHabitRoutes from "./routes/dailyHabitRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send("HEllo");
});

app.use("/habits", habitRoutes);
app.use("/daily-track", dailyHabitRoutes);
app.use("/user", authRoutes);

app.listen(PORT, () => {
  console.log("app is listening at" + PORT);
});

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("app connected to mongo");
  })
  .catch((err) => {
    console.log(err);
  });

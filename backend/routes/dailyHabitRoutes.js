import express from "express";
import { DailyHabit } from "../models/dailyHabitsModel.js";
import mongoose from "mongoose";

let router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.habits || !req.body.userId) {
      res.status(400).send("Invalid Request");
    }

    const existingEntry = await DailyHabit.findOne({
      date: req.body.date,
      userId,
    });
    
    if (existingEntry) {
      existingEntry.habits = req.body.habits;
      await existingEntry.save();
      res.status(200).send(existingEntry);
    } else {
      const newEntry = {
        userId: mongoose.Types.ObjectId(req.body.userId),
        date: new Date(req.body.date),
        habits: req.body.habits,
      };
      const dailyEntry = await DailyHabit.create(newEntry);
      res.status(200).send(dailyEntry);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.headers["user-id"];
    if (!startDate || !endDate || !userId)
      res.status(400).send("invalid request");

    const allEntries = await DailyHabit.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
      userId,
    });
    res.status(200).send(allEntries);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.delete("/", async (req, res) => {
  try {
    await DailyHabit.deleteMany({});
    res.status(200).send("Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
export default router;

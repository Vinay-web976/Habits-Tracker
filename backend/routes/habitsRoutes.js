import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.habit || !req.body.userId) {
      res.status(400).send("Invalid Request");
    }

    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      res.status(401).send("unauthorised request");
    }

    const isHabitExist = user.habits.find(
      (item) => item.title === req.body.habit.title
    );
    if (isHabitExist) {
      return res.status(400).send("Habit already Exists");
    }
    
    user.habits.push(req.body.habit);
    const modifiedUser = await user.save();
    return res.status(200).send(modifiedUser.habits);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.headers["user-id"];
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(401).send("Invalid User");
    }
    res.status(200).send(user.habits);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/", async (req, res) => {
  try {
    const result = await Habit.deleteMany({});
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;

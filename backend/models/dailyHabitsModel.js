import mongoose from "mongoose";

const dailyHabitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
  },
  habits: {
    type: [
      {
        title: String,
        isCompleted: Boolean,
      },
    ],
  },
});

export const DailyHabit = mongoose.model("DailyHabit", dailyHabitSchema);

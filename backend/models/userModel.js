import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  habits: [
    {
      title: {
        type: String,
        unique: true,
      },
      isCompleted: { type: Boolean, default: false }, // Assuming a default value
    },
  ],
});

export const User = mongoose.model("User", userSchema);

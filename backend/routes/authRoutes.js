import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { jwtSecret } from "../config.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      fullName,
    };

    const user = await User.create(newUser);
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid Credentials");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).send("Invalid Credentials");

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;

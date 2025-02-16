import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import express, { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../config/db.js";
import User from "../../models/User.js";
import verifyToken from "../../middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
import "dotenv/config";

const router = express.Router();
// router.use(express.json());

// Connect to MongoDB
connectDB();

//sign in
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists, please login" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword);
    const userNew = new User({ username, password: hashedpassword });
    await userNew.save();

    return res.json({ message: "User Created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("Received username:", username); // Log incoming data
    console.log("Received password:", password);

    const user = await User.findOne({ username });
    console.log("Fetched user from DB:", user); // Debugging

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    console.log("Stored Hashed Password:", user.password); // Check if it's undefined

    if (!user.password) {
      return res
        .status(500)
        .json({ error: "User password is missing in the database" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

export default router;
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

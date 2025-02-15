import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
import "dotenv/config";

import express from "express";

import bcrypt from "bcryptjs";

import mongoose from "mongoose";

import jwt from "jsonwebtoken";
console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

//mongodb connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

const app = express();
app.use(express.json());

//sign in
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
};

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

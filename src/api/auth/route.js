require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
app.use(express.json());
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

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

//sign in
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedpassword = await bcrypt.hash(password, 10);
  const user = new User({ username, hashedpassword });
  await user.save();
  res.json({ message: "User Created successfully" });
});

//login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "User not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
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

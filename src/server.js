import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./api/auth/route.js";
import notesRoutes from "./api/notes/route.js";

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

//Authentication
app.use("/auth", authRoutes); // All auth routes inside "/auth"
//notes
app.use("/notes", notesRoutes); // All notes-related routes inside "/notes"
app.get("/", (req, res) => {
  res.json("Hiii");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

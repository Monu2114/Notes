import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./api/auth/route.js";
import notesRoutes from "./api/notes/route.js";
import cors from "cors";
// Allow all origins (not recommended for production)

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
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

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer"))
    return res.status(403).json({ error: "Access denied. No token provided." });
  const token = authHeader.split(" ")[1];
  try {
    //decoded contains user_id (Mongodb document)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId); // Fetch user from DB

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

export default verifyToken;

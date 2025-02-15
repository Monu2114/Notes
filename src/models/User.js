import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const User = mongoose.model("User", UserSchema);

export default User;

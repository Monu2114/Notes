import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    content: String,
    audioUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    favourite: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;

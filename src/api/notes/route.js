import express from "express";
import Notes from "../../models/Notes.js";
import verifyToken from "../../middleware/auth.js";

const router = express.Router();
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { title, content, audioUrl, favourite } = req.body;
    const userId = req.user._id;
    const newNote = new Notes({ userId, title, content, audioUrl, favourite });
    await newNote.save();

    res.redirect("/notes");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Notes.find({ userId });
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/favourite", verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const data = await Notes.find({ userId, favourite: true });
    res.json(data);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/save-transcription", verifyToken, async (req, res) => {
  try {
    const { transcribedText } = req.body;
    const userId = req.user._id;

    if (!transcribedText) {
      return res.status(400).json({ error: "No text received" });
    }

    const newNote = new Notes({
      userId,
      title: "Voice Note",
      content: transcribedText,
    });

    await newNote.save();
    res.json({ message: "Note saved successfully", note: newNote });
    // res.redirect("/notes");
  } catch (error) {
    console.error("Error saving transcription:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.delete("/notes/:id", verifyToken, async (req, res) => {
  try {
    const noteId = req.params.id;
    const userId = req.user.userId;

    const note = await Notes.findOne({ _id: noteId, userId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    await Notes.findByIdAndDelete(noteId);
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;

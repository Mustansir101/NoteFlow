import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./utilities.js";

import User from "./models/user.model.js";
import Note from "./models/note.model.js";

mongoose.connect(process.env.MONGO_URL);
const app = express();

app.use(express.json());
const cors = require("cors");

app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

app.listen(7000, () => console.log("Server is running on port 7000"));

app.get("/", (req, res) => res.json({ data: "hello World" }));

// create account
app.post("/create-account", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res.status(400).json({ message: "Please fill in all the fields." });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(400).json({ message: "User already exists." });
  }

  const user = new User({ fullname, email, password });
  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5d",
  });

  return res
    .status(200)
    .json({ user, accessToken, message: "User created successfully." });
});

// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill in all the fields." });
  }

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(404).json({ message: "User not Found" });
  }

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5d",
  });
  return res.status(200).json({ user, accessToken, message: "Login success." });
});

// get User
app.get("/get-user", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const isUser = await User.findById({ _id: user._id }).select("-password");
  if (!isUser) {
    return res.status(404).json({ message: "User not Found" });
  }
  return res.status(200).json({ user: isUser, message: "User found." });
});

// add notes
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res.status(400).json({ message: "Please fill in all the fields." });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.status(200).json({ note, message: "Note added successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// update note
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title || !content) {
    return res.status(400).json({ message: "Please fill in all the fields." });
  }

  try {
    const note = await Note.findById({ _id: noteId });
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    if (note.userId !== user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this note." });
    }

    note.title = title;
    note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();
    return res
      .status(200)
      .json({ note, message: "Note updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get all notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({
      isPinned: -1,
      createdAt: -1,
    });
    return res
      .status(200)
      .json({ notes, message: "Notes fetched successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// delete note
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { user } = req.user;
  try {
    const note = await Note.findById({ _id: noteId });
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    if (note.userId !== user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this note." });
    }
    await Note.deleteOne({ _id: noteId });
    return res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// update isPinned
app.put("/update-note-pinned/:noteId", authenticateToken, async (req, res) => {
  const { noteId } = req.params;
  const { isPinned } = req.body;
  const { user } = req.user;
  try {
    const note = await Note.findById({ _id: noteId });
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    if (note.userId !== user._id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this note." });
    }
    if (typeof isPinned === "boolean") note.isPinned = isPinned;
    else
      return res
        .status(400)
        .json({ message: "Please fill in all the fields." });
    await note.save();

    return res
      .status(200)
      .json({ note, message: "Note updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Search Notes
app.get("/search-notes", authenticateToken, async (req, res) => {
  const { user } = req.user;
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Search Query is required." });
  }

  try {
    const notes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $regex: new RegExp(query, "i") } },
      ],
    }).sort({
      isPinned: -1,
      createdAt: -1,
    });
    return res
      .status(200)
      .json({ notes, message: "Notes fetched successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error?.message || "Internal Server Error" });
  }
});

export default app;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Course = require("./models/course");
const Lesson = require("./models/lesson");
const Quiz = require("./models/quiz");
const express = require("express")
const cors = require("cors")
const db = require("./db/connection")

const bcrypt = require("bcryptjs")
const User = require("./models/User")

const app = express();
app.use(cors());
app.use(express.json());

// simple request logger
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend is connecting");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API working" });
});

// Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one course + lessons + quizzes
app.get("/api/courses/:id/full", async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const lessons = await Lesson.find({ courseId: id }).sort({ order: 1 });
    const quizzes = await Quiz.find({ courseId: id });

    res.json({ course, lessons, quizzes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
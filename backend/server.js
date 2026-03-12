// =====================================================
// CORE DEPENDENCIES
// =====================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

require("./db/connection");

const jwt = require("jsonwebtoken")

// =====================================================
// DATABASE MODELS
// =====================================================

const Course = require("./models/course");
const Lesson = require("./models/lesson");
const Quiz = require("./models/quiz");
const Skill = require("./models/skill");
const QuizAttempt = require("./models/QuizAttempt");
const SkillProgress = require("./models/SkillProgress");

const bcrypt = require("bcryptjs")
const User = require("./models/User")

<<<<<<< HEAD
const QuizAttempt = require("./models/QuizAttempt");
=======
// =====================================================
// EXPRESS APP CONFIGURATION
// =====================================================
>>>>>>> develop

const app = express();
app.use(cors());
app.use(express.json());

// =====================================================
// REQUEST LOGGER (Simple middleware for debugging)
// =====================================================

app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// =====================================================
// DATABASE CONNECTION
// =====================================================

mongoose
  .connect(process.env.MONGO_URI, { dbName: "tete" })
  .then(() => console.log("MongoDB connected to tete"))
  .catch((err) => console.log("MongoDB connection error:", err));

// =====================================================
// BASIC ROUTES
// =====================================================

app.get("/", (req, res) => {
  res.send("Backend is connecting");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API working" });
});

// =====================================================
// AUTH ROUTES
// =====================================================

/**
 * API: User Signup
 * POST /auth/signup
 *
 * Creates a new user account with email and password.
 * Password is hashed before being stored in the database.
 */
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password before saving
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: normalizedEmail,
      passwordHash,
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error during signup" });
  }
});

/**
 * API: User Login
 * POST /auth/login
 *
 * Authenticates the user and returns a JWT token
 * that will be used for protected routes.
 */
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

// =====================================================
// AUTH MIDDLEWARE
// =====================================================

/**
 * Middleware: Authentication
 *
 * Verifies JWT token from Authorization header
 * and attaches decoded user info to req.user
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

/**
 * API: Get Current User
 * GET /auth/me
 *
 * Returns the authenticated user's profile.
 */
app.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Auth me error:", err);
    return res.status(500).json({ message: "Server error while fetching user" });
  }
});

// =====================================================
// COURSE ROUTES
// =====================================================

/**
 * API: Get All Courses
 * GET /api/courses
 *
 * Returns all available courses.
 * Authentication required.
 */
app.get("/api/courses", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * API: Get Full Course Content
 * GET /api/courses/:id/full
 *
 * Returns course details including:
 * - course information
 * - lessons
 * - quizzes
 */
app.get("/api/courses/:id/full", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const lessons = await Lesson.find({ courseId: id }).sort({ order: 1 });
    const lessonIds = lessons.map((lesson) => lesson._id);
    const quizzes = await Quiz.find({ lessonId: { $in: lessonIds } });

    res.json({ course, lessons, quizzes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

<<<<<<< HEAD
//quiz attempt
app.post("/api/quiz-attempts", authMiddleware, async (req, res) => {
  try {
    const { quizId, lessonId, score } = req.body;

    if (!quizId || score === undefined) {
      return res.status(400).json({ message: "quizId and score are required" });
    }

    const newAttempt = await QuizAttempt.create({
      userId: req.user.userId,
      quizId,
      lessonId,
      score,
    });

    return res.status(201).json({
      message: "Quiz attempt saved",
      attempt: newAttempt,
    });
  } catch (err) {
    console.error("Quiz attempt error:", err);
    return res.status(500).json({ message: "Server error while saving quiz attempt" });
  }
});

const PORT = process.env.PORT || 5000;
=======
// =====================================================
// QUIZ SUBMISSION ROUTES
// =====================================================

/**
 * API: Submit Lesson Quiz
 * POST /api/lessons/:lessonId/submit
 *
 * Evaluates quiz answers for a lesson and updates
 * the user's skill progress.
 *
 * Rules:
 * - Each lesson contains 5 quiz questions
 * - Passing requires at least 4 correct answers (80%)
 * - Each passed lesson = 20 skill points
 * - Maximum skill score = 100
 * - Highest attempt score per lesson is used
 */

app.post("/api/lessons/:lessonId/submit", authMiddleware, async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { answers } = req.body;
    const userId = req.user.userId;

    // Validate answers
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "Answers are required" });
    }

    // Find the lesson
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Load all quizzes for this lesson
    const quizzes = await Quiz.find({ lessonId });
    if (!quizzes.length) {
      return res.status(404).json({ message: "No quizzes found for this lesson" });
    }

    // Map user answers by quizId for easier lookup
    const answerMap = new Map();
    for (const item of answers) {
      answerMap.set(String(item.quizId), item.selectedAnswer);
    }

    let correctCount = 0;
    const resultAnswers = [];

    // Check each quiz answer
    for (const quiz of quizzes) {
      const selectedAnswer = answerMap.get(String(quiz._id)) || "";
      const isCorrect = selectedAnswer === quiz.answer;

      if (isCorrect) correctCount += 1;

      resultAnswers.push({
        quizId: quiz._id,
        selectedAnswer,
        isCorrect,
      });
    }

    // Calculate score
    const totalQuestions = quizzes.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    // Lesson pass rule (>= 4 correct answers)
    const passed = correctCount >= 4;

    // Save this quiz attempt
    const attempt = await QuizAttempt.create({
      userId,
      courseId: lesson.courseId,
      lessonId: lesson._id,
      skillId: lesson.skillId,
      totalQuestions,
      correctCount,
      score,
      passed,
      answers: resultAnswers,
      submittedAt: new Date(),
    });

    // Find the best attempt for this lesson (highest score)
    const bestAttemptForLesson = await QuizAttempt.findOne({
      userId,
      lessonId: lesson._id,
    }).sort({ score: -1, submittedAt: -1 });

    // Get all lessons belonging to the same skill within the course
    const skillLessons = await Lesson.find({
      courseId: lesson.courseId,
      skillId: lesson.skillId,
    }).select("_id");

    const skillLessonIds = skillLessons.map((item) => item._id);

    // Fetch all attempts for those lessons
    const attemptsForSkill = await QuizAttempt.find({
      userId,
      lessonId: { $in: skillLessonIds },
    }).sort({ score: -1, submittedAt: -1 });

    // Keep only the best attempt per lesson
    const bestAttemptByLesson = new Map();

    for (const item of attemptsForSkill) {
      const key = String(item.lessonId);
      if (!bestAttemptByLesson.has(key)) {
        bestAttemptByLesson.set(key, item);
      }
    }

    // Count how many lessons are passed
    let passedLessons = 0;
    for (const [, best] of bestAttemptByLesson) {
      if (best.passed) passedLessons += 1;
    }

    // Each passed lesson = 20 points (max 100)
    const totalLessons = 5;
    const skillScore = Math.min(passedLessons * 20, 100);

    // Update or create SkillProgress
    const updatedSkillProgress = await SkillProgress.findOneAndUpdate(
      {
        userId,
        skillId: lesson.skillId,
      },
      {
        userId,
        skillId: lesson.skillId,
        courseId: lesson.courseId,
        passedLessons,
        totalLessons,
        skillScore,
        updatedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      }
    );

    // Prepare quiz results for the response
    const results = quizzes.map((quiz) => {
      const matched = resultAnswers.find(
        (item) => String(item.quizId) === String(quiz._id)
      );

      return {
        quizId: quiz._id,
        question: quiz.question,
        selectedAnswer: matched?.selectedAnswer || "",
        correctAnswer: quiz.answer,
        isCorrect: matched?.isCorrect || false,
        review: quiz.review || "",
      };
    });

    return res.status(200).json({
      message: "Quiz submitted successfully",
      lessonId: lesson._id,
      attemptId: attempt._id,
      totalQuestions,
      correctCount,
      score,
      passed,
      bestScore: bestAttemptForLesson?.score ?? score,
      bestPassed: bestAttemptForLesson?.passed ?? passed,
      skillProgress: {
        skillId: updatedSkillProgress.skillId,
        passedLessons: updatedSkillProgress.passedLessons,
        totalLessons: updatedSkillProgress.totalLessons,
        skillScore: updatedSkillProgress.skillScore,
      },
      results,
    });

  } catch (err) {
    console.error("Submit quiz error:", err);
    return res.status(500).json({ message: "Server error during quiz submission" });
  }
});

/**
 * API: Get Dashboard Skill Scores
 * GET /api/dashboard/skills
 *
 * Returns radar chart data for the authenticated user.
 * Each skill score is based on passed lessons:
 * passedLessons * 20
 */
app.get("/api/dashboard/skills", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const progressList = await SkillProgress.find({ userId }).populate("skillId");

    const radarChart = progressList.map((item) => ({
      skillId: item.skillId?._id,
      skill: item.skillId?.name || "Unknown Skill",
      score: item.skillScore,
      passedLessons: item.passedLessons,
      totalLessons: item.totalLessons,
    }));

    return res.status(200).json({
      userId,
      radarChart,
    });
  } catch (err) {
    console.error("Dashboard skills error:", err);
    return res.status(500).json({ message: "Server error while fetching dashboard skills" });
  }
});

const PORT = process.env.PORT || 5050;
>>>>>>> develop
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
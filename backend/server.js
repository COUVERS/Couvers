// =====================================================
// CORE DEPENDENCIES
// =====================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

require("./db/connection");

const jwt = require("jsonwebtoken")
const crypto = require("crypto")

// =====================================================
// DATABASE MODELS
// =====================================================

const Course = require("./models/course");
const Lesson = require("./models/lesson");
const Quiz = require("./models/quiz");
const Skill = require("./models/skill");
const QuizAttempt = require("./models/QuizAttempt");
const SkillProgress = require("./models/SkillProgress");
const LessonProgress = require("./models/LessonProgress");
const Certificate = require("./models/Certificate");

const bcrypt = require("bcryptjs")
const User = require("./models/User")

// =====================================================
// EXPRESS APP CONFIGURATION
// =====================================================

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
    const { email, password, username } = req.body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

   const allowedDomains = ["@codyacademy.edu", "@tete.edu"];
    const isAllowedDomain = allowedDomains.some((domain) =>
      normalizedEmail.endsWith(domain)
    );

    if (!isAllowedDomain) {
      return res.status(400).json({
        message: "This email domain is not registered for a corporate account.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
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
        username: user.username,
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

    const currentHour = new Date().getHours();

    let greetingText = "Welcome back! Let’s continue building your soft skills.";

    if (currentHour < 12) {
      greetingText = "Good Morning! Let's keep learning today as well.";
    } else if (currentHour < 18) {
      greetingText = "Good Afternoon! Let's keep learning today as well.";
    } else {
      greetingText = "Good Evening! Let's keep learning today as well.";
    }

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      dashboardHeader: {
        title: `Hello ${user.username}`,
        description: greetingText,
      },
    });
  } catch (err) {
    console.error("Auth me error:", err);
    return res.status(500).json({ message: "Server error while fetching user" });
  }
});

/**
 * API: Forgot Password
 * POST /auth/forgot-password
 *
 * Generates a reset token for the user and stores it in the database.
 * For now, the reset link is logged in the server console.
 */
app.post("/auth/forgot-password", async (req, res) => {
  try {
    const { email } = req.body
    const normalizedEmail = email?.toLowerCase().trim()

    if (!normalizedEmail) {
      return res.status(400).json({ message: "Email is required" })
    }

    const user = await User.findOne({ email: normalizedEmail })

    // For security, do not reveal whether the email exists
    if (!user) {
      return res.status(200).json({
        message: "If an account with that email exists, a reset link has been generated.",
      })
    }

    const resetToken = crypto.randomBytes(32).toString("hex")
    const resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 30) // 30 minutes

    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = resetPasswordExpires
    await user.save()

    const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`

    console.log("PASSWORD RESET LINK:", resetLink)

    return res.status(200).json({
      message: "If an account with that email exists, a reset link has been generated.",
    })
  } catch (err) {
    console.error("Forgot password error:", err)
    return res.status(500).json({ message: "Server error during forgot password request" })
  }
})

/**
 * API: Reset Password
 * POST /auth/reset-password
 *
 * Resets the user's password using a valid reset token.
 */
app.post("/auth/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    })

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" })
    }

    const passwordHash = await bcrypt.hash(newPassword, 10)

    user.passwordHash = passwordHash
    user.resetPasswordToken = null
    user.resetPasswordExpires = null

    await user.save()

    return res.status(200).json({
      message: "Password has been reset successfully",
    })
  } catch (err) {
    console.error("Reset password error:", err)
    return res.status(500).json({ message: "Server error during password reset" })
  }
})

/**
 * API: Change Password
 * POST /auth/change-password
 *
 * Changes the authenticated user's password.
 */
app.post("/auth/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required",
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      })
    }

    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash)

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      })
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash)

    if (isSamePassword) {
      return res.status(400).json({
        message: "You cannot reuse your current password",
      })
    }

    const passwordHash = await bcrypt.hash(newPassword, 10)
    user.passwordHash = passwordHash

    await user.save()

    return res.status(200).json({
      message: "Password updated successfully",
    })
  } catch (err) {
    console.error("Change password error:", err)
    return res.status(500).json({
      message: "Server error during password change",
    })
  }
})

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
    const courses = await Course.find().sort({ order: 1, createdAt: 1 });
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
    const userId = req.user.userId;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ error: "Course not found" });

    const lessons = await Lesson.find({courseId: new mongoose.Types.ObjectId(id),}).sort({ order: 1, createdAt: 1 });
    const lessonIds = lessons.map((lesson) => lesson._id);
    const quizzes = await Quiz.find({ lessonId: { $in: lessonIds } });

    const progressList = await LessonProgress.find({
      userId,
      lessonId: { $in: lessonIds },
    });

    const progressMap = new Map(
      progressList.map((item) => [String(item.lessonId), item])
    );

    const lessonsWithStatus = lessons.map((lesson, index) => {
      const progress = progressMap.get(String(lesson._id));

      let status = progress?.status || "not_started";

      if (!progress && index > 0) {
        const previousLesson = lessons[index - 1];
        const previousProgress = progressMap.get(String(previousLesson._id));

        if (!previousProgress || previousProgress.status !== "completed") {
          status = "locked";
        }
      }

      return {
        ...lesson.toObject(),
        status,
        bestScore: progress?.bestScore || 0,
        completedAt: progress?.status === "completed" ? progress.updatedAt : null,
      };
    });

    res.json({ course, lessons: lessonsWithStatus, quizzes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * API: Mark lesson as started
 * POST /api/lessons/:lessonId/start
 */
app.post("/api/lessons/:lessonId/start", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId
    const { lessonId } = req.params

    const progress = await LessonProgress.findOneAndUpdate(
      { userId, lessonId },
      {
        $set: { status: "in_progress" },
        $setOnInsert: { bestScore: 0 },
      },
      {
        new: true,
        upsert: true,
      }
    )

    return res.status(200).json({
      message: "Lesson marked as in progress",
      lessonProgress: progress,
    })
  } catch (err) {
    console.error("Start lesson error:", err)
    return res.status(500).json({ message: "Server error while starting lesson" })
  }
})

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

    // Update or create LessonProgress
    const existingLessonProgress = await LessonProgress.findOne({
      userId,
      lessonId: lesson._id,
    });

    let updatedLessonProgress;

    if (!existingLessonProgress) {
      updatedLessonProgress = await LessonProgress.create({
        userId,
        lessonId: lesson._id,
        status: passed ? "completed" : "in_progress",
        bestScore: score,
      });
    } else {
      existingLessonProgress.bestScore = Math.max(existingLessonProgress.bestScore, score);

      if (passed) {
        existingLessonProgress.status = "completed";
      } else if (existingLessonProgress.status !== "completed") {
        existingLessonProgress.status = "in_progress";
      }

      updatedLessonProgress = await existingLessonProgress.save();
    }

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

    // Check if entire course is completed
    const courseLessons = await Lesson.find({ courseId: lesson.courseId }).select("_id");
    const courseLessonIds = courseLessons.map((item) => item._id);

    const completedLessonsInCourse = await LessonProgress.countDocuments({
      userId,
      lessonId: { $in: courseLessonIds },
      status: "completed",
    });

    const totalCourseLessons = courseLessonIds.length;
    const isCourseCompleted =
      totalCourseLessons > 0 && completedLessonsInCourse === totalCourseLessons;

    let certificate = null;

    if (isCourseCompleted) {
      certificate = await Certificate.findOneAndUpdate(
        {
          userId,
          courseId: lesson.courseId,
        },
        {
          userId,
          courseId: lesson.courseId,
          $setOnInsert: {
            issuedAt: new Date(),
            // fileUrl: "",
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

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
      lessonProgress: {
        lessonId: updatedLessonProgress.lessonId,
        status: updatedLessonProgress.status,
        bestScore: updatedLessonProgress.bestScore,
      },
      skillProgress: {
        skillId: updatedSkillProgress.skillId,
        passedLessons: updatedSkillProgress.passedLessons,
        totalLessons: updatedSkillProgress.totalLessons,
        skillScore: updatedSkillProgress.skillScore,
      },
      certificate: certificate
        ? {
          certificateId: certificate._id,
          issuedAt: certificate.issuedAt,
          // fileUrl: certificate.fileUrl,
        }
        : null,
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

/**
 * API: Get Dashboard Course Progress
 * GET /api/dashboard/courses
 *
 * Returns course progress data for the authenticated user.
 * Course progress is based on completed lessons only.
 */
app.get("/api/dashboard/courses", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const courses = await Course.find().sort({ order: 1, createdAt: 1 });
    const courseProgressList = [];

    for (const course of courses) {
      const lessons = await Lesson.find({ courseId: course._id }).select("_id");

      const lessonIds = lessons.map((lesson) => lesson._id);
      const totalLessons = lessonIds.length;

      const completedLessons = await LessonProgress.countDocuments({
        userId,
        lessonId: { $in: lessonIds },
        status: "completed",
      });

      const progress =
        totalLessons === 0
          ? 0
          : Math.round((completedLessons / totalLessons) * 100);

      courseProgressList.push({
        courseId: course._id,
        title: course.title,
        progress,
        completedLessons,
        totalLessons,
      });
    }

    return res.status(200).json({
      userId,
      courses: courseProgressList,
    });
  } catch (err) {
    console.error("Dashboard courses error:", err);
    return res.status(500).json({ message: "Server error while fetching dashboard courses" });
  }
});

/**
 * API: Get Next Lesson for Continue Learning
 * GET /api/dashboard/next-lesson
 *
 * Returns the first lesson that is not yet completed
 * for the authenticated user.
 */
app.get("/api/dashboard/next-lesson", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId

    const courses = await Course.find().sort({ order: 1, createdAt: 1 })

    let hasStartedAnyLesson = false

    for (const course of courses) {
      const lessons = await Lesson.find({ courseId: course._id }).sort({ order: 1 })

      if (!lessons.length) continue

      const lessonIds = lessons.map((lesson) => lesson._id)

      const progressList = await LessonProgress.find({
        userId,
        lessonId: { $in: lessonIds },
      })

      const progressMap = new Map(
        progressList.map((item) => [String(item.lessonId), item.status])
      )

      // once start lesson = true
      if (progressList.length > 0) {
        hasStartedAnyLesson = true
      }

      // return not completed lesson in the started course 
      if (progressList.length > 0) {
        const nextLesson = lessons.find((lesson) => {
          const status = progressMap.get(String(lesson._id))
          return status !== "completed"
        })

        if (nextLesson) {
          return res.status(200).json({
            userId,
            courseId: course._id,
            courseName: course.title,
            lessonId: nextLesson._id,
            lessonTitle: nextLesson.title,
            iconKey: course.icon || "empathy",
            hasStartedLesson: true,
          })
        }
      }
    }

    // 1 new user → no continue
    // 2 complete course → next course lesson
    if (hasStartedAnyLesson) {
      for (const course of courses) {
        const lessons = await Lesson.find({ courseId: course._id }).sort({ order: 1 })

        if (!lessons.length) continue

        const lessonIds = lessons.map((lesson) => lesson._id)

        const progressList = await LessonProgress.find({
          userId,
          lessonId: { $in: lessonIds },
        })

        // non started course
        if (progressList.length === 0) {
          const firstLesson = lessons[0]

          return res.status(200).json({
            userId,
            courseId: course._id,
            courseName: course.title,
            lessonId: firstLesson._id,
            lessonTitle: firstLesson.title,
            iconKey: course.icon || "empathy",
            hasStartedLesson: true,
          })
        }
      }
    }

    return res.status(200).json({
      userId,
      courseId: null,
      courseName: "",
      lessonId: null,
      lessonTitle: "",
      iconKey: "empathy",
      hasStartedLesson: false,
      message: "No next lesson found",
    })
  } catch (err) {
    console.error("Dashboard next lesson error:", err)
    return res.status(500).json({ message: "Server error while fetching next lesson" })
  }
})

/**
 * API: Get Review Lesson
 * GET /api/dashboard/review-lesson
 *
 * Returns one lesson recommended for review.
 */

app.get("/api/dashboard/review-lesson", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId

    const attempts = await QuizAttempt.find({ userId })
      .sort({ score: 1, submittedAt: 1 })

    if (!attempts.length) {
      return res.status(200).json({ reviewLesson: null })
    }

    const bestAttemptByLesson = new Map()

    for (const attempt of attempts) {
      const key = String(attempt.lessonId)

      if (!bestAttemptByLesson.has(key)) {
        bestAttemptByLesson.set(key, attempt)
      }
    }

    const attemptsList = [...bestAttemptByLesson.values()]

    const reviewAttempt = attemptsList.find((a) => a.score < 100)
    const targetAttempt = reviewAttempt || attemptsList[attemptsList.length - 1]

    const lesson = await Lesson.findById(targetAttempt.lessonId)
    if (!lesson) {
      return res.status(200).json({ reviewLesson: null })
    }

    const course = await Course.findById(lesson.courseId)
    if (!course) {
      return res.status(200).json({ reviewLesson: null })
    }

    return res.status(200).json({
      reviewLesson: {
        lessonId: lesson._id,
        lessonTitle: lesson.title,
        courseId: course._id,
        courseName: course.title,
        iconKey: course.icon || "empathy",
        bestScore: targetAttempt.score,
      },
    })
  } catch (err) {
    console.error("Review lesson error:", err);
    return res.status(500).json({ message: "Server error while fetching review lesson" });
  }
})

app.get("/api/dashboard/certificates", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId

    const certificates = await Certificate.find({ userId })
      .populate("courseId")
      .sort({ issuedAt: -1 })

    const items = certificates.map((item) => ({
      certificateId: item._id,
      courseId: item.courseId?._id,
      title: item.courseId?.title || "Untitled Course",
      iconKey: item.courseId?.icon || "empathy",
      issuedAt: item.issuedAt,
      // fileUrl: item.fileUrl || "",
    }))

    const totalCourses = await Course.countDocuments();

    return res.status(200).json({
      userId,
      totalCourses,
      certificates: items,
    })
  } catch (err) {
    console.error("Dashboard certificates error:", err)
    return res.status(500).json({ message: "Server error while fetching certificates" })
  }
})

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
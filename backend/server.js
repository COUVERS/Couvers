const express = require("express")
const cors = require("cors")
const db = require("./db/connection")

<<<<<<< HEAD
const Course = require("./models/course");
const Lesson = require("./models/lesson");
const Quiz = require("./models/quiz");

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
=======
const bcrypt = require("bcryptjs")
const User = require("./models/User")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend is running")
})
>>>>>>> DEV-37-Auth-Bella

// SIGNUP
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body

<<<<<<< HEAD
// ✅ Get all courses
app.get("/api/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get one course + lessons + quizzes
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
=======
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." })
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." })
    }

    const existing = await User.findOne({ email: email.toLowerCase() })
    if (existing) {
      return res.status(409).json({ message: "Email already exists." })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ email, passwordHash })

    return res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, email: user.email },
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

// LOGIN
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." })
    }

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      return res.status(401).json({ message: "Invalid email or password." })
    }

    // BASIC 
    return res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email },
    })
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
})

const PORT = process.env.PORT || 5000

db.once("open", () => {
  console.log("Successfully connected to database!")
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
>>>>>>> DEV-37-Auth-Bella

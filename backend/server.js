const express = require("express")
const cors = require("cors")
const db = require("./db/connection")

const bcrypt = require("bcryptjs")
const User = require("./models/User")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend is running")
})

// SIGNUP
app.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body

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
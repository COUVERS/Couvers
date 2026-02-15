const express = require("express")
const cors = require("cors")
const db = require("./db/connection")
const Course = require("./models/Course")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Backend is running")
})

// GET
app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })
    res.json(courses)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST
app.post("/courses", async (req, res) => {
  try {
    const newCourse = await Course.create(req.body)
    res.status(201).json(newCourse)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

const PORT = process.env.PORT || 5000

db.once("open", () => {
  console.log("MongoDB connected")
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})

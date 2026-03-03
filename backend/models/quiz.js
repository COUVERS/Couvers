const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
  },
  items: [
    {
      order: Number,
      skill: String,
      scenario: String,
      question: String,
      choices: [String],
      correctIndex: Number,
      review: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Quiz", QuizSchema);
const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true,
  },
  scenario: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    default: "multiple-choice",
  },
  question: {
    type: String,
    required: true,
  },
  option: {
    type: [String],
    default: [],
  },
  answer: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    default: "",
  }
}, { timestamps: true });

module.exports = mongoose.model("Quiz", QuizSchema);
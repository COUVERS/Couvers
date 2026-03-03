const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  projectName: String,
  teamName: String,
  title: String,
  description: String,
  contentsOutline: [String],
  skillMapping: [
    {
      question: String,
      skill: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Course", CourseSchema);
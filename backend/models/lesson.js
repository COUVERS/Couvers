const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },
  order: Number,
  title: String,
  lessonDescription: String,
  sections: [
    {
      heading: String,
      content: [String]
    }
  ],
  keyTakeaways: [String]
}, { timestamps: true });

module.exports = mongoose.model("Lesson", LessonSchema);
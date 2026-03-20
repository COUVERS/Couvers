const mongoose = require("mongoose");

const LessonSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  skillId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Skill",
    required: true,
  },
  order: Number,
  title: String,
  lessonDescription: String,
  sections: [
    {
      heading: String,
      blocks: [
        {
          type: {
            type: String,
            enum: ["text", "image"],
          },
          text: String,
          imgUrl: String,
          imgAlt: String,
        },
      ],
    },
  ],
  keyTakeaways: [String],
}, { timestamps: true });

module.exports = mongoose.model("Lesson", LessonSchema);
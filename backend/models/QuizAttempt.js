const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema(
    {
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
        required: true,
    },
    selectedAnswer: {
        type: String,
        required: true,
    },
    isCorrect: {
        type: Boolean,
        required: true,
    },
    },
    { _id: false }
);

const QuizAttemptSchema = new mongoose.Schema(
    {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true,
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        required: true,
        index: true,
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
        index: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
        default: 5,
    },
    correctCount: {
        type: Number,
        required: true,
        min: 0,
    },
    score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    passed: {
        type: Boolean,
        required: true,
    },
    answers: {
        type: [AnswerSchema],
        default: [],
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
    },
    {
    timestamps: false,
    }
);

module.exports = mongoose.model("QuizAttempt", QuizAttemptSchema);
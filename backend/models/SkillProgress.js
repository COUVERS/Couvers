const mongoose = require("mongoose");

const SkillProgressSchema = new mongoose.Schema(
    {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
        index: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true,
    },
    passedLessons: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 5,
    },
    totalLessons: {
        type: Number,
        required: true,
        default: 5,
    },
    skillScore: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 100,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    },
    {
    timestamps: false,
    }
);

SkillProgressSchema.index({ userId: 1, skillId: 1 }, { unique: true });

module.exports = mongoose.model("SkillProgress", SkillProgressSchema);
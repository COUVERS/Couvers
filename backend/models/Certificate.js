const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        issuedAt: {
            type: Date,
            default: Date.now,
        },
        // fileUrl: {
        //     type: String,
        //     default: "",
        // },
    },
    { timestamps: true }
);

certificateSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("Certificate", certificateSchema);
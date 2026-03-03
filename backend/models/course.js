const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
    },
    { timestamps: true, collection: "courses" }
)

module.exports = mongoose.model("Course", courseSchema)
const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        icon: { type: String, default: "" },
        order: { type: Number, required: true },
    },
    { timestamps: true, collection: "courses" }
)

module.exports = mongoose.model("Course", courseSchema)
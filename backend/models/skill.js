const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
        trim: true,
    },
});

module.exports = mongoose.model("Skill", SkillSchema);
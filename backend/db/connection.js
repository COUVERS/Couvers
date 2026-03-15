const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection

db.on("error", (err) => console.error("Connection error:!", err))
db.once("open", () => {
    console.log("Successfully connected to database!")
})

module.exports = db
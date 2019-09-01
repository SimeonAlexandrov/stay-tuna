const nconf = require("nconf")
const mongoose = require("mongoose")

const recommendationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    }
})

const Recommendation = mongoose.model("Recommendation", recommendationSchema)

module.exports = Recommendation
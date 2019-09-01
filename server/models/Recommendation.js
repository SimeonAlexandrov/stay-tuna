const nconf = require("nconf")
const mongoose = require("mongoose")

const recommendationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    date_added: {
        type: Date, 
        default: Date.now
    },
    rating: {
        type: Number,
    }
})

const Recommendation = mongoose.model("Recommendation", recommendationSchema)

module.exports = Recommendation
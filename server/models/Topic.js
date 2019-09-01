const nconf = require("nconf")
const mongoose = require("mongoose")

const topicSchema = mongoose.Schema({
    value: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: String,
        required: true,
    },
    date_added: {
        type: Date, 
        default: Date.now
    }
})

const Topic = mongoose.model("Topic", topicSchema)

module.exports = Topic
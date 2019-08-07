const nconf = require("nconf")
const mongoose = require("mongoose")

mongoose.connect(nconf.get("MONGODB_URL"), {
    useNewUrlParser: true,
    useCreateIndex: true,
})
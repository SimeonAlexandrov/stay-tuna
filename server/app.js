const nconf = require("nconf")
nconf.env().file({ file: __dirname + '/config.json' })
const express = require("express")
const morgan = require("morgan")

const logger = require('./util/logger')
require('./db/db')

const userRouter = require("./routers/user")

const port = nconf.get("PORT") || 8080
const app = express()

app.use(morgan(':status :method :url ":user-agent" Referer: :referrer', {
    stream: logger.stream,
    skip: (req, res) => {
        if (res.statusCode < 200) return true
    },
}))

app.use(express.json())
app.use("/api", userRouter)
app.listen(port, () => {
    logger.info(`Server listening on port: ${port}`)
})
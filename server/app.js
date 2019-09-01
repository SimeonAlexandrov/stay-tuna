const nconf = require("nconf")
nconf.env().file({ file: __dirname + '/config.json' })
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const logger = require('./util/logger')
require('./db/db')

const userRouter = require("./routers/user")
const recommendationRouter = require("./routers/recommendation")
const topicRouter = require("./routers/topic")

const port = nconf.get("PORT") || 8080
const app = express()

app.use(morgan(':status :method :url ":user-agent" Referer: :referrer', {
    stream: logger.stream,
    skip: (req, res) => {
        if (res.statusCode < 200) return true
    },
}))

app.use(express.json())
app.use(cors())

app.get("/", async (req, res) => {
    res.json({status: "ok"})
})

app.use("/api", userRouter)
app.use("/api", recommendationRouter)
app.use("/api", topicRouter)

app.listen(port, () => {
    logger.info(`Server listening on port: ${port}`)
})
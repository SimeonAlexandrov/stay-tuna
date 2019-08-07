const winston = require("winston")
const wcf = require("winston-console-formatter")

const logger = new winston.Logger({ level: "info" })

const { formatter, timestamp } = wcf()
logger.add(winston.transports.Console, { formatter, timestamp })

// morgan stream
logger.stream = {
    write: function(message, encoding) {
        if (!message) return

        logger.info(message.trim())
    }
}

module.exports = logger

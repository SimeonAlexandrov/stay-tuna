const jwt = require("jsonwebtoken")
const nconf = require("nconf")

const User = require("../models/User")

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "")
        const data = jwt.verify(token, nconf.get("JWT_KEY"))
        const user = await User.findOne({
            _id: data._id,
            'tokens.token': token
        })
        if (!user) {
            throw new Error("Not authorized")
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).json({ status: "error", errorMessage: error.message})
    }
}

module.exports = auth
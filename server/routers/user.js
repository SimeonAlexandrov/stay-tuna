const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const User = require("../models/User")

router.post("/users", async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body
        const user = new  User({ username, email, password })
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({
            status: "ok",
            data: {
                user,
                token
            }
        })
    } catch (err) {
        res.status(400).json({ status: "error", errorMessage: err.message })
    }
})

router.post("/users/login", async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            throw new Error("Both username and password are required.")
        }
        const user = await User.findByCredentials(username, password)
        if (!user) {
            return res.status(401).json({ status: "error", errorMessage: "Login failed! Check authentication credentials."})
        }
        const token = await user.generateAuthToken()
        res.status(200).json({ status: "ok", data: { user, token } })
    } catch (error) {
        res.status(400).json({ status: "error", errorMessage: error.message})
    }
})

router.get("/users/me", auth, async (req, res) => {
    res.json({status: "ok", data: { user: req.user}})
})

router.post("/users/me/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( token => {
            return token.token != req.token
        })
        await req.user.save()
        res.json({ status: "ok", data: {}})
    } catch (error) {
        res.status(500).json({ status: "error", errorMessage: ""})
    }
})

module.exports = router
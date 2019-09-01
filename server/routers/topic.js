const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const Topic = require("../models/Topic")


router.get("/topics", auth, async (req, res) => {
    const topics = await Topic.find({
        user: req.user.username
    })
    res.json({
        status: "ok",
        data: {
            topics
        }
    })
})

router.post("/topics", auth, async (req, res) => {
    const value = req.body.topic
    
    const topic = new Topic({
        user: req.user.username,
        value: value
    })

    await topic.save()

    res.json({
        status: "ok",
        data: {
            topic
        }
    })
})

module.exports = router
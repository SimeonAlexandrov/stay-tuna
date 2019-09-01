const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const ScraperService = require("../services/scraper")
const Recommendation = require("../models/Recommendation")

router.get("/recommendations", auth, async (req, res) => {
    const recommendations = await Recommendation.find({
        user: req.user.username
    })

    res.json({
        status: "ok",
        data: {
            recommendations
        }
    })
})

router.post("/recommendations", auth,  async (req, res) => {
    const scraper = new ScraperService()
    // TODO Get user topics an pass them to scraper service
    const { textContent, href } = await scraper.scrape()

    const recommendation = new Recommendation({ 
        title: textContent, 
        url: href,
        user: req.user.username
    })

    await recommendation.save()

    res.json({
        status: "ok",
        data: {
            recommendation
        }
    })
})

module.exports = router
const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const ScraperService = require("../services/scraper")

router.get("/scraper", async (req, res) => {
    res.json({status: "ok"})
})

router.post("/scraper", async (req, res) => {
    const scraper = new ScraperService()
    const titles = await scraper.scrape()
    res.json({
        status: "ok",
        data: {
            titles,
            count: titles.length
        }
    })
})

module.exports = router
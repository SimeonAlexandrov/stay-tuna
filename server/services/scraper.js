const puppeteer = require("puppeteer")

const logger = require("../util/logger")

class ScraperService {
    constructor() {
        logger.info("Initializing sraper service")
    }
    async scrape() {
        logger.info("Scraping")
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://medium.com/topic/javascript');

        // TODO scrape for article titles

        await browser.close()
        logger.info("Scraping is done")
    }
}

module.exports = ScraperService
const puppeteer = require("puppeteer")

const logger = require("../util/logger")

const SCRAPER_TARGETS = [
    // "https://google.com"
    "https://medium.com/topic/javascript",
    // "https://medium.com/topic/programming",
    // "https://medium.com/topic/data-science",
    // "https://medium.com/topic/artificial-intelligence",
    // "https://medium.com/topic/machine-learning",
    // "https://medium.com/topic/cybersecurity",
    // "https://medium.com/topic/blockchain"
]

const NUMBER_OF_SCROLLS = 1

class ScraperService {
    async scrape() {
        logger.info("Scraping")
        let result = []

        // Initialize puppeteer scraper
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        for (const target of SCRAPER_TARGETS) {
            const titles = await this.scrapeTopic(page, target)
            result = result.concat(titles)
        }

        browser.close()
        logger.info("Scraping is done")

        // Currently returning random recommendation
        return result[Math.floor(Math.random()*result.length)]
    }

    async scrapeTopic(page, target) {
        await page.goto(target, {
            timeout: 0
        })

        try {
            for (let j = 0; j < NUMBER_OF_SCROLLS; j++) {
                logger.info(`Scroll down ${target}`)
                await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
                await page.waitFor(1000);
            }
            const titles = await page.evaluate(
                () => Array.from( document.querySelectorAll('h3'), 
                    element => { 
                        return { 
                            textContent: element.textContent, 
                            href: element.firstChild.href
                        }
                    }
                )
            )
            return titles
        } catch (err) {
            logger.error(err)
        }
    }
}

module.exports = ScraperService
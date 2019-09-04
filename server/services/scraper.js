const puppeteer = require("puppeteer")

const logger = require("../util/logger")

const SCRAPER_TARGETS = [
    "https://medium.com/topic/javascript",
    "https://medium.com/topic/programming",
    // "https://medium.com/topic/data-science",
    // "https://medium.com/topic/artificial-intelligence",
    // "https://medium.com/topic/machine-learning",
    // "https://medium.com/topic/cybersecurity",
    // "https://medium.com/topic/blockchain"
]

const NUMBER_OF_SCROLLS = 5

class ScraperService {
    async scrape(topics) {
        logger.info("Scraping")
        let recommendations = []

        // Initialize puppeteer scraper
        const browser = await puppeteer.launch({headless: true})
        const page = await browser.newPage()
        for (const target of SCRAPER_TARGETS) {
            const titles = await this.scrapeTopic(page, target)
            recommendations = recommendations.concat(titles)
        }

        browser.close()
        logger.info("Scraping is done")
        console.log("Will determine the best rec based on ", topics)
        // Currently returning random recommendation
        // should do this only when users's topics are empty
        if (topics.length === 0) {
            return recommendations[Math.floor(Math.random()*recommendations.length)]
        } else {
            return this.determineBestRecommendation(recommendations, topics)
        }
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

    determineBestRecommendation(recommendations, topics) {
        const scoredRecs = recommendations.map(r => {
            let count = 0
            for (const t of topics) {
                if (r.textContent.toLowerCase().includes(t.value.toLowerCase())) {
                    count = count + 1
                }
            }
            return {
                textContent: r.textContent,
                href: r.href,
                score: count
            }
        })
        const chosen = scoredRecs.sort((a, b) => b.score - a.score)[0]
        console.log("Chosen: ", chosen)
        return chosen
    }
}

module.exports = ScraperService
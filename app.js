const scraper = require('./scraper');

const url = 'https://www.apartments.com/walden-wood-saint-louis-park-mn/y1zh26t/'

scraper.scrapeAptDataFromUrl(url, logIt)

function logIt(aptData) {
    console.log(`${aptData.name} apartments are located in ${aptData.neighborhood}`)
}
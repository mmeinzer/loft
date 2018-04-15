const scraper = require('./scraper')

const url = 'https://www.apartments.com/foundry-lake-street-minneapolis-mn/fh79dgs/'

scraper.getAptData(url, dataHandle)

function dataHandle(data) {
    console.log(data)
}

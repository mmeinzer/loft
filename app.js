const scraper = require('./scraper')

const url = 'https://www.apartments.com/east-village-apartments-minneapolis-mn/m27vx2l/'
scraper.getAptData(url, dataHandle)

function dataHandle(data) {
    console.log(data.name, data.address, data.neighborhood)
}

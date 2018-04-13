const rp = require('request-promise');
const cheerio = require('cheerio');

// const aptUrl = 'https://www.apartments.com/talo-minneapolis-mn/cpmckfd/'
// function logIt(data) {
//     console.log(data)
// }
// getDataFromUrl(aptUrl, logIt)

function getDataFromUrl(url, done) {
    const data = {
        name: '',
        address: '',
        neighborhood: ''
    }
    const selectors = [
        {target: 'name', str: '.propertyName'},
        {target: 'address', str: '.propertyAddress > h2'},
        {target: 'neighborhood', str: 'a.neighborhood'}
    ]

    const rpOptions = {
        uri: url,
        transform: body => cheerio.load(body)
    }
    rp(rpOptions)
        .then($ => {
            selectors.forEach(sel => {
                const val = $(sel.str).first().contents().text()
                    .replace(/^([\n\r\s]+)(\w)/, '$2')
                    .replace(/[\n]+/g, '')
                    .replace(/[\r\s]+/g, ' ')
                    .replace(/[\r\s]$/, '')
                data[sel.target] = val
            })
            done(data)
        })
        .catch(err => {
            console.log(err)
        })
};

exports.scrapeAptDataFromUrl = getDataFromUrl;

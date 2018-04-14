const rp = require('request-promise');
const cheerio = require('cheerio');

function getAptDataFromUrl(url, done) {
    const data = {}
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
                const val = $(sel.str)
                    .first().contents().text()
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

exports.getAptData = getAptDataFromUrl;

const rp = require('request-promise');
const { JSDOM } = require('jsdom');

function getAptDataFromUrl(url, done) {
    const data = {}
    const selectors = [
        {target: 'name', str: '.propertyName'},
        {target: 'address', str: '.propertyAddress > h2'},
        {target: 'neighborhood', str: 'a.neighborhood'}
    ]
    const rpOptions = {
        uri: url,
        transform: body => new JSDOM(body)
    }
    rp(rpOptions)
        .then(dom => {
            const doc = dom.window.document
            selectors.forEach(sel => {
                data[sel.target] = doc.querySelector(sel.str).textContent
                    .trim()
                    .replace(/([\s]+)/g, ' ');
            })
            done(data)
        })
        .catch(err => {
            console.error(err)
        })
};

exports.getAptData = getAptDataFromUrl;

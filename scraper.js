const rp = require('request-promise');
const { JSDOM } = require('jsdom');

function getAptDataFromUrl(url, done) {
    const data = {}
    const dataToGet = [
        {target: 'name', sel: '.propertyName'},
        {target: 'address', sel: '.propertyAddress > h2'},
        {target: 'neighborhood', sel: 'a.neighborhood'},
        {target: 'units'}
    ]
    const rpOptions = {
        uri: url,
        transform: body => new JSDOM(body)
    }
    rp(rpOptions)
        .then(dom => {
            const doc = dom.window.document
            dataToGet.forEach(item => {
                if (item.target === 'units') {
                    data[item.target] = []
                    doc.querySelectorAll('.rentalGridRow').forEach(unitEle => {
                        const unit = {
                            rent: unitEle.dataset.maxrent,
                            beds: unitEle.dataset.beds,
                            baths: unitEle.dataset.baths,
                            avail: unitEle.querySelector('.available').textContent.trim()
                        }
                        data[item.target].push(unit) 
                    })
                } else {
                    data[item.target] = doc.querySelector(item.sel).textContent
                        .trim()
                        .replace(/([\s]+)/g, ' ');
                }
            })
            done(data)
        })
        .catch(err => {
            console.error(err)
        })
};

exports.getAptData = getAptDataFromUrl;

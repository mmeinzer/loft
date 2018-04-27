const rp = require('request-promise');
const { JSDOM } = require('jsdom');

function getAptDataFromUrl(url, done) {
  const urlRe = /https?:\/\/www.apartments.com\/.+\/.+/;
  if (urlRe.test(url)) {
    const data = {};
    data.url = url;
    const dataToGet = [
      { target: 'name', sel: '.propertyName' },
      { target: 'address', sel: '.propertyAddress > h2' },
      { target: 'neighborhood', sel: '.neighborhoodAddress > .neighborhood + .neighborhood' },
      { target: 'units' },
    ];
    const rpOptions = {
      uri: url,
      transform: body => new JSDOM(body),
    };
    rp(rpOptions)
      .then((dom) => {
        const doc = dom.window.document;
        dataToGet.forEach((item) => {
          if (item.target === 'units') {
            data[item.target] = [];
            doc.querySelectorAll('.rentalGridRow').forEach((unitEle) => {
              const openUnits = unitEle.querySelector('.available')
                ? unitEle.querySelector('.available')
                : false;
              if (openUnits) {
                const unit = {
                  rent: Number(unitEle.dataset.maxrent),
                  beds: Number(unitEle.dataset.beds),
                  baths: Number(unitEle.dataset.baths),
                  avail: openUnits.textContent.trim(),
                };
                data[item.target].push(unit);
              }
            });
          } else {
            const dataValue = doc
              .querySelector(item.sel)
              .textContent.trim()
              .replace(/([\s]+)/g, ' ');
            data[item.target] = dataValue;
          }
        });
        data.updated = new Date().toJSON();
        done(data);
      })
      .catch((err) => {
        throw err;
      });
  } else {
    done(undefined);
  }
}

exports.getAptData = getAptDataFromUrl;

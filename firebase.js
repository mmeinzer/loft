const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const { getAptData } = require('./scraper');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://loft-cbea3.firebaseio.com/',
});

const database = admin.database();

function writeAptData(aptData) {
  if (aptData) {
    const {
      url, name, address, neighborhood, units, updated,
    } = aptData;
    const allApartments = database.ref('allApartments');
    allApartments.push({
      url,
      name,
      address,
      neighborhood,
      units,
      updated,
    });
  }
}

function monitorAndFetchData() {
  function handleChange(snapshot) {
    const value = snapshot.val();
    getAptData(value.url, writeAptData);
  }

  const localApts = database.ref('apts');
  localApts.on('child_added', handleChange);
}

exports.writeAptData = writeAptData;
exports.monitorAndFetchData = monitorAndFetchData;

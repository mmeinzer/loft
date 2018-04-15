const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { URL } = require('url');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://loft-cbea3.firebaseio.com/',
});

const database = admin.database();

function writeAptData(aptData) {
  const {
    aptUrl, name, address, neighborhood, units,
  } = aptData;
  const url = new URL(aptUrl);
  const hostname = url.hostname.replace(/\./g, '%2E');
  const pathname = url.pathname.replace(/\//g, '%2F');
  database.ref(`apartments/${hostname}${pathname}`).set({
    aptUrl,
    name,
    address,
    neighborhood,
    units,
  });
}

exports.writeAptData = writeAptData;
exports.database = database;

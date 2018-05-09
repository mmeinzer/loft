const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const { getAptData } = require('./scraper');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://loft-cbea3.firebaseio.com/',
});

const database = admin.database();

const clientData = database.ref('clientData');
const allData = database.ref('allData');

function initializeDataUtilities() {
  console.log('Initialzing');
  let allDataSnap;
  let clientDataSnap;
  let urlToKeyMap;

  function handleClientUrlAdd(snapshot) {
    console.log('Calling handleClientUrlAdd...');
    const value = snapshot.val();
    const { url } = value;

    // check to see if the url is in allData already
    console.log(`Checking DB for ${url}`);
    if (urlInAllData(url, allDataSnap)) {
      console.log('Already here. Not getting data.');
    } else {
      console.log('Not here. Getting data.');
      getAptData(url, writeAptData);
    }
    // if it's in allData, push it to the clientData
    // otherwise, get it and add it to allData
  }

  function handleAllDataUpdate(snapshot) {
    console.log('Calling handleAllDataUpdate...does nothing');
    const value = snapshot.val();
    // push updated info to client
  }

  function handleAllDataAdd(snapshot) {
    console.log('Calling handleAllDataAdd...');
    const value = snapshot.val();
    const key = urlToKeyMap[value.url];
    console.log('key is', key)
    if (key) {clientData.child(key).update(value)};
  }

  console.log('Adding event listeners...');
  allData.on('value', (snap) => {
    console.log('Updating allData snapshot...');
    allDataSnap = snap.val();
  });
  clientData.on('value', (snap) => {
    console.log('Updating clientData snapshot...');
    clientDataSnap = snap.val();
    urlToKeyMap = Object.keys(clientDataSnap).reduce((obj, key) => {
      obj[clientDataSnap[key].url] = key;
      return obj;
    }, {});
  });

  setTimeout(() => {
    clientData.on('child_added', handleClientUrlAdd);

    allData.on('child_changed', handleAllDataUpdate);
    allData.on('child_added', handleAllDataAdd);
  }, 5000);
}

function writeAptData(aptData) {
  console.log('Calling writeAptData...');
  if (aptData) {
    const {
      url, name, address, neighborhood, units, updated,
    } = aptData;
    allData.push({
      url,
      name,
      address,
      neighborhood,
      units,
      updated,
    });
  }
}

function urlInAllData(url, snapshot) {
  for (const key in snapshot) {
    if (snapshot[key].url === url) {
      return true;
    }
  }
  return false;
}

exports.initializeDataUtilities = initializeDataUtilities;

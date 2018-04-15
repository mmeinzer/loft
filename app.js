const firebase = require('./firebase');
const scraper = require('./scraper');

const apts = [
  'https://www.apartments.com/4101-w-31st-st-minneapolis-mn-unit-202/3kqdxmd/',
  'https://www.apartments.com/hoigaard-village-minneapolis-mn/6cj6hpv/',
  'https://www.apartments.com/2920-dean-parkway-minneapolis-mn/7b4z0px/',
  'https://www.apartments.com/east-village-apartments-minneapolis-mn/m27vx2l/',
  'https://www.apartments.com/bolero-flats-minneapolis-mn/4f56rgh/',
  'https://www.apartments.com/south-wirth-apartments-minneapolis-mn/m0mg08j/',
  'https://www.apartments.com/abbott-apartments-minneapolis-mn/j2k51b6/',
  'https://www.apartments.com/uptown-apartments-minneapolis-mn/pntb6wr/',
  'https://www.apartments.com/oak-grove-towers-minneapolis-mn/rvcjj93/',
  'https://www.apartments.com/stonehouse-square-apartments-minneapolis-mn/4r7n2ck/',
  'https://www.apartments.com/park-plaza-apartments-minneapolis-mn/9t3l2j4/',
  'https://www.apartments.com/kenwood-gables-minneapolis-mn/zzklnww/',
  'https://www.apartments.com/lakewood-isles-calhoun-west-apartments-minneapolis-mn/1dmqvf5/',
  'https://www.apartments.com/the-liberty-apartments-townhomes-golden-valley-mn/k51y609/'];

apts.forEach(url => scraper.getAptData(url, firebase.writeAptData));

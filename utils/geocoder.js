const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'opencage',

  apiKey: process.env.GEOCODER_API_KEY,

  formatter: null // 'gpx', 'string', ... (optional formatting)
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
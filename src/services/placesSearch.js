'use strict';

let https = require('https');
let placesKey = require('../../.placesKey');

let getPics = (lat, lon, moduleCallback) => {

  let apiCallback = (response) => {
    let str = '';

    response.on('error', function(err) {
      res.send('error: ' + err.message);
    });

    response.on('data', (chunk) => {
      str += chunk;
    });

    response.on('end', () => {
      if (str) {
        moduleCallback(null, str);
      }
      else {
        moduleCallback('There was an error retrieving the photos')
      }
    });
  };

  let options = {
    host: 'maps.googleapis.com',
    path: '/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&radius=500&key=' + placesKey.key
  };
  https.request(options, apiCallback).end();
}

module.exports = getPics;

let https = require('https');
let placesKey = require('../../.placesKey');

let getDetails = (id, moduleCallback) => {

  let apiCallback = (response) => {
    str = '';

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
        moduleCallback('There was an error retrieving the description')
      }
    });
  };

  let options = {
    host: 'maps.googleapis.com',
    path: '/maps/api/place/details/json?placeid=' + id + '&key=' + placesKey.key
  };
  
  https.request(options, apiCallback).end();
}

module.exports = getDetails;
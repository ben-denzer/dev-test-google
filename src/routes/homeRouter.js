let express = require('express');
let homeRouter = express.Router();
let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let getPics = require('../services/placesSearch');
let getDetails = require('../services/getDetails');

let router = () => {

  homeRouter.all('/getPics', jsonParser, (req, res) => {
    if (!req.body) {
      return console.log('Error in Request to /getPics')
    }

    getPics(req.body.lat, req.body.lon, (err, data) => {
      if (err) {
        return console.log('Error', err);
      }

      res.status(200).send(data);
    });
  });

  homeRouter.all('/getDetails', jsonParser, (req, res) => {
    if (!req.body) {
      return console.log('Error in request to /getDetails');
    }

    getDetails(req.body.id, (err, data) => {
      if (err) {
        return console.log('Error', err);
      }
      res.status(200).send(data);
    });
  });

  homeRouter.get('/', (req, res) => {
    res.status(200).render('index');
  });

  return homeRouter;
}

module.exports = router;
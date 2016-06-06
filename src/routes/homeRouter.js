let express = require('express');
let homeRouter = express.Router();

let router = () => {

  homeRouter.use('/', (req, res) => {
    res.status(200).render('index');
  });

  return homeRouter;
}

module.exports = router;
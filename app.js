let express = require('express');
let path = require('path');
let app = express();
let port = process.env.PORT || 3000;
let ejs = require('ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components/startbootstrap-round-about')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

let homeRouter = require('./src/routes/homeRouter')();
app.use('/', homeRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('listening on port ' + port);
});
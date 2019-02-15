const express = require('express');
const session = require('express-session');
const mustacheExpress = require('mustache-express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const dns = require('dns');
const cors = require('cors');

const app = express();

// exports 
module.exports = app;



app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(cors());
app.use('/', routes);

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));


// log stuff
console.log('Freecodecamp-API projects');


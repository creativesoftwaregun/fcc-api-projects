const express = require('express');
const router = express.Router();
const mustache = require('mustache');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const moment= require('moment');
const shortid = require('shortid');

const url_utility = require('../lib/url_utility');
const timestamp_utility = require('../lib/timestamp_utility');
const whoami_utility = require('../lib/whoami_utility');
const exercisetracker_utility = require('../lib/exercisetracker_utility');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// exports
module.exports = router;

require('dotenv').config();
router.use(session({ secret: process.env.SESSION_SECRET }));

// default 
router.get('/',(req,res) => {	
	res.render('index', { title: 'FreeCodeCamp -API projects' });
});

router.get('/api/shorturl/new',(req,res) => {	
	console.log('Session id: ' + req.session.id);
	res.render('url-shortener', { title: 'FreeCodeCamp -URL shortener', heading: 'Your URL:' });
});

router.post('/api/shorturl/new', urlencodedParser, function(req,res) {
	var url = req.body.input_url;
	//var json_output;
	url_utility.get_shortened_url(req.session, url, (err, response) => {
		console.log('get_shortened_url completed');
		if(!err)
		{			
			res.json({ original_url : url , short_url: response });
		}
		else
		{
      console.log('error response: ' + err);
			res.json( { error : "invalid URL" } );
		}
	});
});

router.get('/api/shorturl/:id',(req,res) => {	
	url_utility.get_url_by_id(req.session, req.params.id, (err, response) => {
      if(!err)
      {
        res.redirect(response);
      }
      else{
        res.json( { error : "URL id not found" } );
      }
  });
});


// if no date specified then use current date and time
router.get('/api/timestamp/',(req,res) => {	
	timestamp_utility.get_current_date_in_utc( (err, date_string) => {
		if(!err)
		{
			res.redirect('/api/timestamp/' + date_string);
		}
	});
	
});

// process date string
router.get('/api/timestamp/:date_string',(req,res) => {	
	timestamp_utility.check_date( req.params.date_string, (err, json_value) => {
		res.json(json_value);
	})
});


router.get("/api/whoami", function (req, res) {
	whoami_utility.get_whoami_json(req, (err, json) => {
		if(!err)
		{
			res.json(json);
		}
	})
});

router.get("/exercisetracker", function (req, res) {
	res.render('exercisetracker-adduser', { title: 'FreeCodeCamp -Exercise tracker', heading: 'Create a New user:' });
});

router.post("/api/exercise/new-user", urlencodedParser, function (req, res) {
	exercisetracker_utility.store_user(req.body.input_username, (err, json) => {
    if(err)
    {
      res.send({
        success: false,
        message: err
			});
    }
    else{
      res.send(json);
    }		
	})
});


router.get("/api/exercise/users", function (req, res) {
	exercisetracker_utility.list_users((err, json) => {
    if(err)
    {
      res.send({
        success: false,
        message: err
			});
    }
    else{
      res.send(json);
    }
	})
});




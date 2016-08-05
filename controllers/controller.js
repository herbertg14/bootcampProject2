var express = require('express');
var router = express.Router();
var models = require('../models');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.get('/', function(req,res) {
	res.redirect('/login');
});

router.get('/login', function(req,res) {
		res.render('login');
});

router.post('/login/new', function(req,res) {
			res.redirect('/login');
});


module.exports = router;

var express = require('express');
var router = express.Router();
var models = require('../models');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var sha1 = require('sha1');

router.get('/', function(req,res) {
	res.redirect('/login');
});

router.get('/login', function(req,res) {
		res.render('login');
});

//after the user signs up redirect them back to the main login page to now sign in.
router.post('/login/new', function(req,res) {
  models.User.findOne({ where: {username: req.body.username} }).then(function(user) {
  if (user) { // if the record already exists in the db
    res.send(500,'showAlert');
  }
  else {
    models.User.create({
        firstName: req.body.firstName,
        LastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: sha1(req.body.password)
    }).then(function(){
      res.redirect('/login');
    });
  }
	});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var models = require('../models');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var sha1 = require('sha1');
var nodemailer = require('nodemailer');
var sparkPostTransport = require('nodemailer-sparkpost-transport');
var transporter = nodemailer.createTransport(sparkPostTransport('df054040764a5d7be9c95470ea939af4c87b6dc9'));

router.get('/', function(req,res) {
	res.redirect('/login');
});

router.get('/login', function(req,res) {
		res.render('login');
});

router.get('/mylist/:username', function(req,res){
  models.User.findOne({ where: {username: req.params.username, password: sha1(req.body.password)}}).then(function(data){
    var hbsObject = {user: data};
    res.render('index', hbsObject);
  });
});

//after the user signs up redirect them back to the main login page to now sign in.
router.post('/login/new', function(req,res) {
  models.User.findOne({ where: {username: req.body.username} }).then(function(user) {
  if (user) { // if the record already exists in the db then send an alert telling the user that the username already exist
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

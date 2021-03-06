var express = require('express');
var router = express.Router();
var models = require('../models');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var sha1 = require('sha1');
var Yelp = require('yelp');
var nodemailer = require('nodemailer');
var sparkPostTransport = require('nodemailer-sparkpost-transport');
var smtpTransport = require('nodemailer-smtp-transport');


var transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.sparkpostmail.com',
    port: 587,
    auth: {
        user: 'SMTP_Injection',
        pass: 'c6497552924237b06390b3e585e446676e354d08'
    }
}));

var yelp = new Yelp({
  consumer_key: 'hsHd6BVA10xYWbvnZm1i5g',
  consumer_secret: '7KhLRiEPkLUYedLyYwj-lA-WSaE',
  token: 'hqhmDxd8ePISP7dpERvMjjQ3iozrNJ8Z',
  token_secret: 'jfzDO7m_on8qWK3b1fnDfxVc0YU',
});

router.get('/', function(req,res) {
	res.redirect('/login');
});

router.get('/login', function(req,res) {
	res.render('login');
});

router.post('/signIn', function(req,res){
	// console.log("sign in route hit");
	models.Users.findOne({
		where: {username: req.body.username}
	}).then(function(user) {
		if (user === null){
			// console.log("user inputed a username the doesn't exist");
			res.send('userName');
		} else {
			if (sha1(req.body.password) == user.password){
				// save the user's information
				// to req.session, as the comments below show
				req.session.logged_in = true;
				// the username to the session
				req.session.username = user.username;
				// the user id to the session
				req.session.user_id = user.id;
				// and the user's email.
				req.session.user_email = user.email;
				// console.log("user has been signed in");
				res.redirect('/myList');
			} else {
				// console.log("password didn't match");
				res.send('password');
			}
	}
	});
});

router.get('/myList', function(req,res){
	models.ToDoList.findAll({where: {username: req.session.username } }).then(function(data){
		var hbsObject = {user : data};
		res.render('index', hbsObject);
	});
});

//after the user signs up redirect them back to the main login page to now sign in.
router.post('/login/new', function(req,res) {
  models.Users.findOne({ where: {username: req.body.username} }).then(function(user) {
  if(user) { // if the record already exists in the db then send an alert telling the user that the username already exist
    res.send("alert");
  } else {
    models.Users.create({
        firstName: req.body.firstName,
        LastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: sha1(req.body.password)
    }).then(function(){
			console.log(req.body.email);
			transporter.sendMail({
				from: 'sandbox@sparkpostbox.com',
				to: req.body.email,
				subject: 'Thanks for signing up with Eatinerary!',
				text: "Hey, "+ req.body.firstName + ". Your account is now registered with Eatinerary. Enjoy!",
				html: ""
			},function(err, succ){
				if (err){
					console.log('mail not sent: ' + err);
				}
				else {console.log('mail sent');}
			});
      res.send('reload');
    });
  }
	});
});

router.post('/addToList', function(req,res){
	models.ToDoList.create({
		username: req.session.username,
		email: req.session.user_email,
		title: req.body.title,
		description: req.body.description,
		remind: req.body.remind,
		remindTime: req.body.remindTime,
		city: req.body.city,
		address: req.body.address,
		state: req.body.state,
		restaurantPhone: req.body.restaurantPhone,
		restaurantURL: req.body.restaurantURL

	}).then(function(){
		res.redirect('/myList');
	});
});

router.get('/myList/deleteItem/:itemID', function(req,res){
	models.ToDoList.destroy({where: {id: req.params.itemID}}).then(function(){
		res.redirect('/myList');
	});
});

router.get('/logout', function(req,res){
	req.session.destroy(function(err) {
     res.redirect('/');
  });
});

router.post('/yelp', function(req,res){
	console.log(req.body);
	yelp.search({
		term: req.body.keyword,
		location: req.body.city + ", " + req.body.state,
		limit: req.body.range
	})
	.then(function (data) {
	  // console.log(data);
		res.send(data);
	})
	.catch(function (err) {
	  console.error(err);
	});
});

module.exports = router;

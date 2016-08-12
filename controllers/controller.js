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

router.post('/signIn', function(req,res){
	console.log("sign in route hit");
	models.Users.findOne({
		where: {username: req.body.username}
	}).then(function(user) {
		if (user == null){
			console.log("user inputed a username the doesn't exist");
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
				console.log("user has been signed in");
				res.redirect('/myList');
			} else {
				console.log("password didn't match");
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
	console.log("should be rendering index.handlebars");
	// res.render('index');
});

//after the user signs up redirect them back to the main login page to now sign in.
router.post('/login/new', function(req,res) {
	console.log("new user route hit");
  models.Users.findOne({ where: {username: req.body.username} }).then(function(user) {
  if(user) { // if the record already exists in the db then send an alert telling the user that the username already exist
		console.log("the user selected a username already in the database");
    res.send("alert");
  } else {
		console.log("new user being created");
    models.Users.create({
        firstName: req.body.firstName,
        LastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: sha1(req.body.password)
    }).then(function(){
			console.log("redirecting");
      res.send('reload');
    });
  }
	});
});

router.post('/addToList', function(req,res){
	console.log('user added an item to their list');
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

module.exports = router;

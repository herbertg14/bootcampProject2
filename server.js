var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var models = require('./models');
var moment = require('moment');
var nodemailer = require('nodemailer');
var sparkPostTransport = require('nodemailer-sparkpost-transport');
var transporter = nodemailer.createTransport(sparkPostTransport({sparkPostApiKey: "a694a29aeadc75c9a943f51ad1fd8b5afc8f816f"}));

var app = express();

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');

app.use(session({ secret: 'app', cookie: { maxAge: 600000 }}));
app.use(cookieParser());

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/controller.js');
app.use('/', routes);

setInterval(function(){
	models.ToDoList.findAll({where: {remind: true}}).then(function(data){
		console.log(data);
		for (var i = 0; i < data.length; i++){
			var time = moment().diff(data[i].dataValues.remindTime, "days");
			console.log(time);
			if(time === 0){
				transporter.sendMail({
				  from: 'sandbox@sparkpostbox.com',
				  to: data[i].dataValues.email,
				  subject: 'Your eatinerary reminder',
				  text: "Your eatinerary to do: "+ data[i].dataValues.title + " is coming up soon. Don't forget!",
				});
			}
		}
	});
}, 100*60*60*13);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
  console.log("listening on port: "+ PORT);
});

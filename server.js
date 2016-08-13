var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var models = require('./models');
var moment = require('moment');
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

transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

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

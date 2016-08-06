var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var Users = require("./models")["Users"];
var ToDoList = require("./models")["ToDoList"];

Users.sync();
ToDoList.sync();

var app = express();

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


//still have to add route file
var routes = require('./controllers/controller.js');
app.use('/', routes);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function(){
  console.log("listening on port: "+ PORT);
});

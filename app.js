var express= require('express');
var config = require('./config');
var todoController = require('./controllers/todoController');
var app = express();

//setup the view engine to ejs
app.set('view engine','ejs');

//setup requests for static files
app.use(express.static('./public'));

//fire the app controllers
todoController(app);

//listen to a port
app.listen(config['development']['server'].port);
console.log('started the server. listening at port 4500');


/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var event = require('./routes/event');
var points = require('./routes/points');
var login = require('./routes/login')
var create = require('./routes/create');
var edit = require('./routes/edit');
var item = require('./routes/item');
var category = require('./routes/category')


// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/index', index.view);
app.get('/', login.view);
app.get('/event', event.view);
app.get('/points', points.view);
app.get('/create', create.view);
app.get('/edit', edit.view);
app.get('/viewAlt', event.eventAlt);

app.post('/additem', item.add);
app.post('/addcategory', category.add);
app.post('/updateevent', edit.update);
app.post('/claimitem', item.claim);
app.post('/login', login.login);
app.post('/createEvent', create.add);
app.post('/deleteEvent', event.delete);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

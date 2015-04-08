var express = require('express');
var serveStatic=require('serve-static');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer=require('multer');
var ejs=require('ejs');
var methodOverride=require('method-override');
var session=require('cookie-session');



var routes = require('./routes/index');
var login=require('./routes/login');
var logout=require('./routes/logout');
var users = require('./routes/users');
var movie=require('./routes/movie');

var app = express();

//var mongoose=require("mongoose");
//var config=require('./config');
//mongoose.connect(config.db.mongodb);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname, '/public'));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(methodOverride(function(req,res){
	if(req.body&&typeof req.body==='object'&&'_method' in req.body){
		console.log("==========");
		var method=req.body._method;
		delete req.body._method;
		return method;
	}
	}))
app.use(cookieParser());
app.use(session({keys:['key1','key2']
}));
app.use(function(req, res, next){
res.locals.user = req.session.user;
var err=req.session.error;
delete req.session.error;
res.locals.message='';
if(err){
	res.locals.message='<div>'+err+'</div>';
}
next();
});
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname, '/public'));

//app.use(serveStatic(__dirname+'/public'));

app.use('/', routes);
app.use('/login',login);
app.use('/logout',logout);
app.use('/users', users);
app.use('/movie',movie);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var packageRouter = require('./routes/package');
var starsRouter = require('./routes/stars');
var slotRouter = require('./routes/slot');
var package = require("./models/package");
var resourceRouter = require('./routes/resource');


//We can seed the collection if needed on server start
async function recreateDB(){
// Delete everything
await package.deleteMany();
let instance1 = new package({mode:"Express", price:20.0,quantity:550.0});
instance1.save( function(err,doc) {
if(err) return console.error(err);
console.log("First object saved")
});
let instance2 = new package({mode:"Prime Express", price:90.0,quantity:9000.0});
instance2.save( function(err,doc) {
if(err) return console.error(err);
console.log("Second object saved")
});
let instance3 = new package({mode:"Normal", price:5.0,quantity:70.0});
instance3.save( function(err,doc) {
if(err) return console.error(err);
console.log("Third object saved")
});
}
let reseed = true;
if (reseed) { recreateDB();}

const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true, useUnifiedTopology: true});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/package', packageRouter);
app.use('/stars', starsRouter);
app.use('/slot', slotRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();


var indexRouter = require('./routes/index');
var newMessageRouter = require('./routes/newMessage');

var app = express();
require('dotenv').config()

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false)
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.mongoDb);
}

app.use(
  cors({
    origin:["https://localhost:3000", process.env.ORIGIN],
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/new', newMessageRouter);

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



/*
    <ul>
      <% for(let i=0; i < messages.length; i++) { %>
        <li class="messageCard">
          <h1><% messages[i].user %></h1>
          <p><% messages[i].text %></p>
          <h2><% messages[i].added %></h2>
        </li>
      <% } %>
    </ul>

    */
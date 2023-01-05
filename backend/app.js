
var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

require("./models/connection");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var bookingRouter = require("./routes/bookings")
var usersRouter = require("./routes/users");
var invoicesRouter = require("./routes/invoices");
var photosRouter = require("./routes/photos")

var app = express();
const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bookings',bookingRouter);
app.use('/invoices',invoicesRouter);
app.use('/photos',photosRouter);

module.exports = app;

require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

// REQUIRED PACKAGES FOR PASSPORT
const passport = require("passport");
const bcrypt = require("bcrypt");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");

// Cloudinary 
let cloudinary = require('cloudinary').v2;

// User Model
const User = require("./models/User");
const Review = require("./models/Review");

// TODO: Can name 'Project-2' anything we want the database name to be
mongoose
  .connect('mongodb://localhost/Project-2', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

const index = require('./routes/index');
app.use('/', index);

// ****************************************
// Passport
// ****************************************

// TODO: Add Social Media verification?

app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

app.use(flash());

passport.use(new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, next) => {
  // Finds if username exsists
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    // if passwprd matches
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

// ****************************************
// ROUTES 
// ****************************************


const celebRoutes = require('./routes/');
app.use('/celebrities',celebRoutes);


>>>>>>> 5154f54b1dde2f15aab9d67b9daf312b57de5c78:app.js
// Routes for Authorization 
app.use('/', require('./routes/authorization-routes'));
app.use('/', require('./routes/user-routes'));

// Routes for Reviews
app.use('/', require('./routes/review-routes'));

module.exports = app;

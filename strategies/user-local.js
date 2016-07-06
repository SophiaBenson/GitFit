var passport = require('passport');
var LocalStrategy = require ('passport-local').Strategy;
var mongoose = require('mongoose');

//require model with passport-local-mongoose
var User = require('../model/user');

passport.use(new LocalStrategy(User.authenticate()));

//serialize and deserialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

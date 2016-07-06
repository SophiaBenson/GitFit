var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('../strategies/user-local.js');
var session = require('express-session');


app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'any string',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: false}
}));//end app.use

//passport
app.use(passport.initialize());
app.use(passport.session());

// require routers
var index = require('../routes/index');
var register = require('../routes/register');

app.use(express.static('public'));

//register and login routes
app.use('/register', register);
app.use('/*', index);

//spin up server
app.listen(3000, function () {
  console.log("server is listening on port 3000");
});

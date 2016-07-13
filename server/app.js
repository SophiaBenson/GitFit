var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var path = require('path');
// This is the file we created in step 2.
// This will configure Passport to use Auth0
// Session and cookies middlewares to keep user logged in
var cookieParser = require('cookie-parser');
var session = require('express-session');
var strategy = require('../setup-passport');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/CalendarEvents');

var eventSchema = new mongoose.Schema({
  start: String,
  end: String,
  id: String,
  text: String,
});
var ourModel = mongoose.model('ourModel', eventSchema);
app.get('/getEvents', function (req,res){
  ourModel.find()
  .then(function (data) {
    res.send(data);
  });
});//end get

app.post('/testPost', function (req, res) {
  console.log("req.body.start time" + req.body.start);
  // var eventToAdd={
  //   start: req.body.start + "T" + req.body.timeStartHour + ":" + req.body.timeStartMin + ":00",
  //   end: req.body.end + "T" + req.body.timeEndHour + ":" + req.body.timeEndMin + ":00",
  //   text: req.body.selectData + "<br> Notes: " + req.body.notes + "<br>" + req.body.selectData2 + "<br> Notes: " + req.body.notes2 + "<br>" + req.body.selectData3 + "<br> Notes: " + req.body.notes3
  // };
  // var newEvent=ourModel(EventToAdd);
  // newEvent.save();

});
app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: 'c2QOfPozJgj4JYNhLYWQD0sdaoAVpfBlya4EP5cjJik5tiYaaPhhWg7bPxO2zILj', resave: false,  saveUninitialized: false }));

// Auth0 callback handler
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
  });

  app.get('/user', function (req, res) {
    res.render('user', {
      user: req.user

    });

  });

//End of Auth0 google account authentication.

app.use(bodyParser.urlencoded({extended: true}));

// app.use(session({
//   secret: 'any string',
//   key: 'user',
//   resave: 'true',
//   saveUninitialized: false,
//   cookie: {maxage: 60000, secure: false}
// }));//end app.use

//passport
app.use(passport.initialize());
app.use(passport.session());


// require routers
var index = require('../routes/index');
// var main = require('../public/views/main.html');
app.use(express.static('public'));

//register and login routes

app.use('/', index);
app.get('/main', function (req, res) {
  console.log('In main schedule page');
  res.sendFile(path.resolve('public/views/main.html'));
});

//spin up server
app.listen(3000, function () {
  console.log("server is listening on port 3000");
});

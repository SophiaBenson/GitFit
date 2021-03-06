var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var strategy = require('../setup-passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://sophiab:Purplebirdy01!@ds023465.mlab.com:23465/calendarevents');
app.use(bodyParser.json());
var eventSchema = new mongoose.Schema({
  start: String,
  end: String,
  id: String,
  text: String,
});
var ourModel = mongoose.model('ourModel', eventSchema);
app.get('/getEvents', function (req,res){
  console.log("getting events");
  ourModel.find()
  .then(function (data) {
    res.send(data);
  });
});//end get

app.post('/testPost', function (req, res) {
  console.log("req.body.start time");
  console.dir(req.body);

  var eventToAdd={
    start: req.body.start,
    end: req.body.end,
    text: req.body.text
  };
  console.log(eventToAdd);

  var newEvent=ourModel(eventToAdd);
  newEvent.save();
  res.sendStatus(200);

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
app.listen(process.env.PORT || 3000, function () {
  console.log("server is listening on port 3000");
});

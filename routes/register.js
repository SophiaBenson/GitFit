var express = require('express');
var router = express.Router();

var path = require('path');
// var pg = require('pg');//will need mongo instead

//modules
var encryptionLib = require('../modules/encryption');
var connection = require('../modules/connection')

router.get('/', function (req, res) {
  res.sendFile(path.resolve('public/views/register.html'));
});

//mongo communication in here

module.exports = router;

var mongoose = require('mongoose');
// 27017 is default mongo port
mongoose.connect('localhost:/27017/soloProject');

module.exports = mongoose;

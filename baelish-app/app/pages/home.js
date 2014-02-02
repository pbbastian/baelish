var fm = require('fruitmachine');
var Home = require('../views/home');

module.exports = function(data, cb) {
  var view = new Home({
    model: {
      title: "Herrooooooooooooooo"
    }
  });
  
  cb(view);
}
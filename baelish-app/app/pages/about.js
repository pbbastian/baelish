var fm = require('fruitmachine');
var _ = require('lodash');
var About = require('../views/about');

module.exports = function(params, cb) {
  var view = new About({
    model: _.pick(params, 'name')
  });

  cb(view);
}
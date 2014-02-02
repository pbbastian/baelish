//# sourceMappingURL=about.map
require('source-map-support').install();
(function() {
  var About, fm, _;

  fm = require("fruitmachine");

  _ = require("lodash");

  About = require("../views/about");

  module.exports = function(params, done) {
    var view;
    view = new About({
      model: _.pick(params, "name")
    });
    return done(view);
  };

}).call(this);

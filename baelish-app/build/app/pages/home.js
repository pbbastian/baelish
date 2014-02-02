//# sourceMappingURL=home.map
require('source-map-support').install();
(function() {
  var Home, fm;

  fm = require("fruitmachine");

  Home = require("../views/home");

  module.exports = function(data, cb) {
    var view;
    view = new Home({
      model: {
        title: "Herrooooooooooooooo"
      }
    });
    return cb(view);
  };

}).call(this);

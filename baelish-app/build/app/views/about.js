//# sourceMappingURL=about.map
require('source-map-support').install();
(function() {
  var fm;

  fm = require("fruitmachine");

  module.exports = fm.define({
    module: "about",
    template: require("../templates/about"),
    initialize: function(options) {
      console.log("initialize");
      return console.log(options);
    },
    setup: function() {
      return console.log("setup");
    },
    teardown: function() {
      return console.log("teardown");
    },
    destroy: function() {
      return console.log("destroy");
    }
  });

}).call(this);

//# sourceMappingURL=home.map
require('source-map-support').install();
(function() {
  var fm;

  fm = require("fruitmachine");

  module.exports = fm.define({
    module: "home",
    template: require("../templates/home")
  });

}).call(this);

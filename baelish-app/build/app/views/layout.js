//# sourceMappingURL=layout.map
require('source-map-support').install();
(function() {
  var fm;

  fm = require("fruitmachine");

  module.exports = fm.define({
    module: "layout",
    template: require("../templates/layout")
  });

}).call(this);

//# sourceMappingURL=routes.map
require('source-map-support').install();
(function() {
  module.exports = {
    "/": require("./pages/home"),
    "/about/:name": require("./pages/about")
  };

}).call(this);

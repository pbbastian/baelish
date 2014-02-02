//# sourceMappingURL=client.map
require('source-map-support').install();
(function() {
  var Layout, content, fruitmachine, page, routes, _;

  global.Hogan = require("hogan.js");

  global.app = {};

  fruitmachine = require("fruitmachine");

  routes = require("./routes");

  page = require("page");

  _ = require("lodash");

  Layout = require("./views/layout");

  app.layout = (fruitmachine(window.layout)).setup();

  content = document.querySelector(".js-app_content");

  _.forOwn(routes, function(Page, route) {
    return page(route, function(ctx, next) {
      console.log(ctx);
      return Page(ctx.params, function(page) {
        app.layout.add(page, {
          slot: "content"
        });
        return app.layout.render().setup();
      });
    });
  });

  page({
    dispatch: false
  });

}).call(this);

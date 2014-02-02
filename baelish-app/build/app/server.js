//# sourceMappingURL=server.map
require('source-map-support').install();
(function() {
  var Layout, app, expose, express, http, path, routes, _;

  global.Hogan = require("hogan.js");

  express = require("express");

  expose = require("express-expose");

  http = require("http");

  path = require("path");

  _ = require("lodash");

  routes = require("./routes");

  Layout = require("./views/layout");

  app = express();

  app.configure(function() {
    app.set("port", process.env.PORT || 3000);
    app.set("views", __dirname + "/templates");
    app.set("view engine", "hjs");
    app.use(express.favicon());
    app.use(express.logger("dev"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express["static"](path.join(__dirname, "../", "public")));
  });

  app.configure("development", function() {
    return app.use(express.errorHandler());
  });

  _.forOwn(routes, function(Page, route) {
    return app.get(route, function(req, res) {
      return Page(req.params, function(page) {
        var layout;
        layout = new Layout();
        layout.add(page, {
          slot: "content"
        });
        res.expose(layout.toJSON(), "layout");
        return res.render("wrapper", {
          title: "Baelish",
          body: layout.toHTML()
        });
      });
    });
  });

  http.createServer(app).listen(app.get("port"), function() {
    return console.log("Express server listening on port " + app.get("port"));
  });

}).call(this);

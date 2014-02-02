global.Hogan = require("hogan.js")
express = require("express")
expose = require("express-expose")
http = require("http")
path = require("path")
_ = require("lodash")
routes = require("./routes")
Layout = require("./views/layout")

app = express()

app.configure ->
  app.set "port", process.env.PORT or 3000
  app.set "views", __dirname + "/templates"
  app.set "view engine", "hjs"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express["static"](path.join(__dirname, "../", "public"))

app.configure "development", ->
  app.use express.errorHandler()

_.forOwn routes, (Page, route) ->
  app.get route, (req, res) ->
    Page req.params, (page) ->
      layout = new Layout()
      layout.add page,
        slot: "content"

      res.expose layout.toJSON(), "layout"
      res.render "wrapper",
        title: "Baelish"
        body: layout.toHTML()

http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")

global.Hogan = require "hogan.js"
global.app = {}

fruitmachine = require "fruitmachine"
routes = require "./routes"
page = require "page"
_ = require "lodash"

Layout = require "./views/layout"

app.layout = (fruitmachine window.layout).setup()
content = document.querySelector ".js-app_content"

_.forOwn routes, (Page, route) ->
  page route, (ctx, next) ->
    console.log ctx
    Page ctx.params, (page) ->
      app.layout.add page,
        slot: "content"
      app.layout.render().setup()

page
  dispatch: false
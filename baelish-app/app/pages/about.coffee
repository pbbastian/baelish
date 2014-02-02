fm = require "fruitmachine"
_ = require "lodash"
About = require "../views/about"

module.exports = (params, done) ->
  view = new About
    model: _.pick params, "name"
  done view
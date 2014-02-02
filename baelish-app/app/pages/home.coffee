fm = require "fruitmachine"
Home = require "../views/home"

module.exports = (data, cb) ->
  view = new Home
    model:
      title: "Herrooooooooooooooo"
  cb view
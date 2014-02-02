fm = require "fruitmachine"

module.exports = fm.define
  module: "about"
  template: require "../templates/about"

  initialize: (options) ->
    console.log "initialize"
    console.log options

  setup: ->
    console.log "setup"

  teardown: ->
    console.log "teardown"

  destroy: ->
    console.log "destroy"
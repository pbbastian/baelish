var fm = require('fruitmachine');
var template = require('../templates')['about'];

module.exports = fm.define({
  module: 'about',
  template: template,
  initialize: function(options){
    console.log("initialize");
    console.log(options);
  },
  setup: function(){
    console.log("setup");
  },
  teardown: function(){
    console.log("teardown");
  },
  destroy: function(){
    console.log("destroy");
  }
});
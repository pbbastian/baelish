global.Hogan = require('hogan.js');
global.app = {};

var fruitmachine = require('fruitmachine');
var routes = require('./routes');
var page = require('page');
var _ = require('lodash');

var Layout = require('./views/layout');

app.layout = fruitmachine(window.layout).setup();

var content = document.querySelector('.js-app_content');

_.forOwn(routes, function(Page, route) {
  page(route, function(ctx, next) {
    console.log(ctx);
    Page(ctx.params, function(page) {
      app.layout.add(page, { slot: 'content' });
      app.layout.render().setup();
    });
  });
});

page({ dispatch: false });
global.Hogan = require('hogan.js');
var express = require('express');
var expose = require('express-expose');
var http = require('http');
var path = require('path');
var Home = require('./pages/home');
var Layout = require('./views/layout');
var _ = require('lodash');
var routes = require('./routes');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/templates');
  app.set('view engine', 'hjs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express['static'](path.join(__dirname, '../', 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

_.forOwn(routes, function(Page, route) {
  app.get(route, function(req, res) {
    Page(req.params, function(page) {
      var layout = new Layout();
      layout.add(page, { slot: 'content' });
      res.expose(layout.toJSON(), 'layout');
      res.render('wrapper', {
        title: 'Baelish',
        body: layout.toHTML()
      });
    });
  });
});

// app.get('/', function(req, res) {
//   var layout = new Layout();
//   var page = Home({title: 'Baelish is awesome!'});
//   layout.add(page, { slot: 'content' });
//   res.expose(layout.toJSON(), 'layout');
//   res.render('wrapper', {
//     title: 'Baelish',
//     body: layout.toHTML()
//   });
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
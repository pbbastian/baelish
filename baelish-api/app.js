var restify = require('restify');

var server = restify.createServer({ name: 'my-api' });
 
server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url)
});
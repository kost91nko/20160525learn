'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var path = require('path');

var config = {
  root: './',
  port: 8080,
  ip: '0.0.0.0',
  publicFolder: 'src'
}

exports = module.exports = function runServer(ip, port, publicPath, webpackMiddleware){
  var app = express();

  app.set('view engine', 'html');

  app.use(webpackMiddleware);

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());

  app.use(express.static(path.join(config.root, publicPath || config.publicFolder)));
  app.set('appPath', path.join(config.root, publicPath || config.publicFolder));

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

  var server = require('http').createServer(app);
  // Start server
  server.listen(port || config.port, ip || config.ip, function () {
    console.log('Express server listening on localhost:%d', port || config.port);
  });
}

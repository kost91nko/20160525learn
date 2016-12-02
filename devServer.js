'use strict';

var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var path = require('path');
var csp = require('helmet-csp')

var config = {
  root: './',
  port: 8080,
  ip: '0.0.0.0',
  publicFolder: 'src'
}

exports = module.exports = function runServer(ip, port, publicPath, webpackMiddleware, callback){
  var app = express();

  app.set('view engine', 'html');

  app.use(webpackMiddleware);

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({
    type: ['json', 'application/csp-report']
  }));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(csp({
    // Specify directives as normal.
    directives: {
      defaultSrc: ["'self'"],
      upgradeInsecureRequests: true
    },

    // This module will detect common mistakes in your directives and throw errors
    // if it finds any. To disable this, enable "loose mode".
    loose: false,

    // Set to true if you only want browsers to report errors, not block them.
    // You may also set this to a function(req, res) in order to decide dynamically
    // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
    reportOnly: false,

    // Set to true if you want to blindly set all headers: Content-Security-Policy,
    // X-WebKit-CSP, and X-Content-Security-Policy.
    setAllHeaders: false,

    // Set to true if you want to disable CSP on Android where it can be buggy.
    disableAndroid: false,

    // Set to false if you want to completely disable any user-agent sniffing.
    // This may make the headers less compatible but it will be much faster.
    // This defaults to `true`.
    browserSniff: true
  }));

  app.use(express.static(path.join(config.root, publicPath || config.publicFolder)));
  app.set('appPath', path.join(config.root, publicPath || config.publicFolder));

  app.post('/report-violation', function (req, res) {
    if (req.body) {
      console.log('CSP Violation: ', req.body)
    } else {
      console.log('CSP Violation: No data received!')
    }
    res.status(204).end()
  })
  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      //res.setHeader('Content-Security-Policy', 'default-src \'self\'');
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'), {
        headers: {
          'Content-Security-Policy': 'default-src \'self\''
        }
      });
    });

  var server = require('http').createServer(app);
  // Start server
  server.listen(port || config.port, ip || config.ip, function () {
    console.log('Express server listening on localhost:%d', port || config.port);
    callback && callback();
  });
}

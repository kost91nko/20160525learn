// require all modules ending in ".spec" from the
// current directory and all subdirectories
import './polyfills';
import './vendor';

import 'angular-mocks';

import './app.module';

var testsContext = require.context(".", true, /\.spec\.js$/);
console.log("All Specs: " + testsContext.keys());

testsContext.keys().forEach(function(path) {
  try {
    testsContext(path);
  } catch(err) {
    console.error('[ERROR] WITH SPEC FILE: ', path);
    console.error(err);
  }
});

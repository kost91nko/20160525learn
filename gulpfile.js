var path = require("path");
var gulp = require('gulp');
var gutil = require("gulp-util");
var hub = require('gulp-hub');
var config = require("./config/common.config");

// Load some files into the registry]
hub([config.path.tasks('*.js')]);

//-------------------------------------------------
// Default gulp task that includes all
gulp.task('default', ['bundle-livereload']);

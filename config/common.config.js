
var gutil = require('gulp-util');
var path = require('path');

exports.ngModule ='app';
exports.port = 7000;

exports.paths = {
  src: 'src',
  dist: 'bin',
  tmp: '.tmp',
  e2e: 'e2e',
  tasks: 'gulp_tasks'
};

exports.path = {};
for (var pathName in exports.paths) {
  if (exports.paths.hasOwnProperty(pathName)) {
    exports.paths[pathName] = path.resolve(__dirname, '..', exports.paths[pathName])
    exports.path[pathName] = (function(pathValue){
      return function pathJoin() {
          var funcArgs = Array.prototype.slice.call(arguments);
          var joinArgs = [pathValue].concat(funcArgs);
          return path.join.apply(this, joinArgs);
        };
    })(exports.paths[pathName]);
  }
}

exports.errorHandler = function (title) {
  return function (err) {
    gutil.log(gutil.colors.red(`[${title}]`), err.toString());
    this.emit('end');
  };
};

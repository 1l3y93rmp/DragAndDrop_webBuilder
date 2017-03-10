var browserSync = require('browser-sync');
var gulp        = require('gulp');
var connectRoute = require('connect-route');
var mockApi = require('../mockapi.js');

gulp.task('browserSync', ['build'], function() {
  if(!global.isWatching) return;
  browserSync({
    server: {
      // src is included for use with sass source maps
      baseDir: [global.staticDir],
      middleware: connectRoute(mockApi)
    },
    port: global.serverPort,
    ghostMode: false,
    notify: false,
    files: [
      // Watch everything in webroot
      global.staticDir + '/**.*',
      // Exclude sourcemap files
      '!' + global.staticDir + '/**/*.map',
      '!' + global.staticDir + '/_css/**/*.sass'
    ]
  });
});

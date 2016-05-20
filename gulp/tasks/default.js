var gulp = require('gulp');

gulp.task('default', ['browserSync'], function() {
  if(!global.isWatching) return;
  gulp.watch(global.staticDir + '/sass/**', ['sass']);
});

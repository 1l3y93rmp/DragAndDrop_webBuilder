var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var handleErrors = require('../util/handleErrors');

gulp.task('sass', function () {
  return gulp.src(global.staticDir + '/sass/*.scss')
    .pipe(sass({
      compass: true,
      sourcemap: global.debugMode
    }))
    .on('error', handleErrors)
    .pipe(gulp.dest(global.staticDir + '/build/css'));
});

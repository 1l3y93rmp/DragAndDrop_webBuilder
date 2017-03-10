var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var browserSync = require('browser-sync');




gulp.task('sass', function () {
  return gulp.src(global.staticDir + '/_css/**/*.sass')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({debug: true}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(global.staticDir + '/_css'))
    .pipe(browserSync.stream());
});

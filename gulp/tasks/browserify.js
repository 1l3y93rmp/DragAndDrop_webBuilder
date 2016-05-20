/* browserify task
   ---------------
   Bundle javascripty things with browserify!

   If the watch task is running, this uses watchify instead
   of browserify for faster bundling using caching.
*/

var browserify   = require('browserify');
var watchify     = require('watchify');
var bundleLogger = require('../util/bundleLogger');
var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var source       = require('vinyl-source-stream');
var uglify       = require('gulp-uglify');
var buffer       = require('vinyl-buffer');
var sourcemaps   = require('gulp-sourcemaps');
var gulpif       = require('gulp-if');

gulp.task('browserify', function() {
  var bundler = browserify({
    // Required watchify args
    cache: {}, packageCache: {}, fullPaths: true,
    // Specify the entry point of your app
    entries: [global.jsEntries],
    // Add file extentions to make optional in your requires
    extensions: ['.js'],
    // Enable source maps!
    debug: global.debugMode
  });

  var bundle = function() {
    // Log when bundling starts
    bundleLogger.start();

    return bundler
      .bundle()
      // Report compile errors
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the
      // stream gulp compatible. Specifiy the
      // desired output filename here.
      .pipe(source(global.jsDistFile))
      //convert from streaming to buffered vinyl file object
      .pipe(buffer())
      // create sourcemap
      .pipe(gulpif(global.debugMode, sourcemaps.init({loadMaps: true})))
      // compress
      .pipe(uglify())
      .pipe(gulpif(global.debugMode, sourcemaps.write('./')))
      // Specify the output destination
      .pipe(gulp.dest(global.jsDistDir))
      // Log when bundling completes!
      .on('end', bundleLogger.end);
  };

  if(global.isWatching) {
    bundler = watchify(bundler);
    // Rebundle with watchify on changes.
    bundler.on('update', bundle);
  }

  return bundle();
});

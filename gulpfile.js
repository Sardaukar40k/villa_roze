var  gulp         = require('gulp'),
     sass         = require('gulp-sass'),
     concat       = require('gulp-concat'),
     autoprefixer = require('gulp-autoprefixer'),
     uglify       = require('gulp-uglify'),
     minifyCss    = require('gulp-minify-css'),
     rename       = require('gulp-rename'),
     notify       = require('gulp-notify'),
     serve        = require('serve-static'),
     browserSync  = require('browser-sync');



// --Server
gulp.task('server', function() {
  return connect().use(serve(__dirname))
    .listen(8080)
    .on('listening', function() {
      console.log('Server is running!');
    });
});


// --Browser Sync
gulp.task('browsersync', function(cb) {
  return browsersync({
    server: {
      baseDir:'./'
    }
  }, cb);
});
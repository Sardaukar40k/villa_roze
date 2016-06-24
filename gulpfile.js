var  gulp         = require('gulp'),
     sass         = require('gulp-sass'),
     concat       = require('gulp-concat'),
     autoprefixer = require('gulp-autoprefixer'),
     uglify       = require('gulp-uglify'),
     minifyCss    = require('gulp-minify-css'),
     rename       = require('gulp-rename'),
     notify       = require('gulp-notify'),
     serve        = require('serve-static'),
     browsersync  = require('browser-sync'),
    connect       = require('connect');

// --SCSS
gulp.task('styles', function() {
  gulp.src(
    [
      'app/libs/bootstrap/dist/css/bootstrap.min.css',
      'app/libs/owl-carousel/owl-carousel/owl.carousel.css',
      'src/scss/variables/_*.scss',
      'src/scss/base/_*.scss',
      'src/scss/modules/*/_*.scss'
    ]
  )
    .pipe(concat('style.scss'))
    .pipe(sass({outputStyle : 'expended'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers : ['last 10 version']}))
    .pipe(minifyCss())
    .pipe(gulp.dest('./app/'))
    .pipe(notify('Styles done!'))
});


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


// --Watch
gulp.task('watch', function() {
  gulp.watch(['src/scss/*/_*.scss', 'src/scss/modules/*/_*.scss'], ['styles', browsersync.reload]);
  gulp.watch('index.html', browsersync.reload);
});


// --Default
gulp.task('default', ['styles', 'server', 'browsersync', 'watch']);
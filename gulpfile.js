var gulp = require('gulp')
  , path = require('path')
  , fs = require('fs')
  , clean = require('gulp-clean')
  , gutil = require('gulp-util')
  , changed = require('gulp-changed')
  , concat = require('gulp-concat')
  , uglify = require('gulp-uglify')
  , connect = require('gulp-connect')
  , coffee = require('gulp-coffee')
  , sass = require('gulp-sass')
  , jade = require('gulp-jade')
  , ngAnnotate = require('gulp-ng-annotate')
  , templateCache = require('gulp-angular-templatecache')
  , bowerFiles = require('main-bower-files')
  , PUBLIC_PATH = 'www'
  , APP_PATH = 'src'
  , VENDOR_PATH = 'bower_components'
  , ASSETS_PATH = APP_PATH + '/assets'
  , SASS_MAIN_FILE = APP_PATH + '/styles/style.scss'
  , VENDOR_MAIN_FILE = 'vendor.js'
  , APP_MAIN_FILE = 'app.js'
  , TEMPLATES_FILE = 'templates.js'
  , TEMPLATES_MODULE = 'templates'
  , CSS_MAIN_FILE = 'style.css';

function onlyJsFiles(filenames) {
  return filenames.filter(function(filename) {
    return filename.indexOf('.js') === (filename.length - '.js'.length)
  });
}

gulp.task('default', ['build']);

gulp.task('build', ['assets', 'compile', 'minify']);

gulp.task('watch', ['build'], function() {
  gulp.watch(APP_PATH + '/**/*.coffee', ['coffee']);
  gulp.watch(APP_PATH + '/*.jade', ['jade']);
  gulp.watch(APP_PATH + '/*/**/*.jade', ['templates']);
  gulp.watch(APP_PATH + '/**/*.scss', ['sass']);
  gulp.watch(ASSETS_PATH, ['assets']);
  gulp.watch(VENDOR_PATH, ['vendor']);
  connect.server({
    root: PUBLIC_PATH,
    livereload: true
  });
});

gulp.task('compile', ['vendor', 'coffee', 'sass', 'jade', 'templates']);

gulp.task('vendor', function() {
  gulp.src(onlyJsFiles(bowerFiles()))
  .pipe(changed(PUBLIC_PATH))
  .pipe(concat(VENDOR_MAIN_FILE))
  .pipe(gulp.dest(PUBLIC_PATH + '/js'))
  .pipe(connect.reload());
});

gulp.task('coffee', function() {
  gulp.src(APP_PATH + '/**/*.coffee')
  .pipe(changed(PUBLIC_PATH))
  .pipe(coffee({ bare: true }))
  .on('error', gutil.log)
  .pipe(concat(APP_MAIN_FILE))
  .pipe(gulp.dest(PUBLIC_PATH + '/js'))
  .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src(SASS_MAIN_FILE)
  .pipe(changed(PUBLIC_PATH))
  .pipe(sass())
  .on('error', gutil.log)
  .pipe(gulp.dest(PUBLIC_PATH + '/css'))
  .pipe(connect.reload());
});

gulp.task('jade', function() {
  gulp.src(APP_PATH + '/*.jade')
  .pipe(changed(PUBLIC_PATH))
  .pipe(jade({ pretty: true }))
  .on('error', gutil.log)
  .pipe(gulp.dest(PUBLIC_PATH))
  .pipe(connect.reload());
});

gulp.task('templates', function() {
  gulp.src(APP_PATH + '/*/**/*.jade')
  .pipe(changed(PUBLIC_PATH))
  .pipe(jade({ doctype: 'html' }))
  .on('error', gutil.log)
  .pipe(templateCache({
    filename: TEMPLATES_FILE,
    module: TEMPLATES_MODULE,
    standalone: true
  }))
  .pipe(gulp.dest(PUBLIC_PATH + '/js'))
  .pipe(connect.reload());
});

gulp.task('assets', function() {
  gulp.src(ASSETS_PATH + '/**')
  .pipe(gulp.dest(PUBLIC_PATH))
  .pipe(connect.reload());
});

gulp.task('minify', ['vendor', 'coffee'], function() {
  gulp.src(PUBLIC_PATH + '/**/*.js')
  .pipe(changed(PUBLIC_PATH))
  .pipe(ngAnnotate())
  .pipe(uglify({ outSourceMap: true }))
  .pipe(gulp.dest(PUBLIC_PATH))
  .pipe(connect.reload());
});

gulp.task('clean', function() {
  gulp.src(PUBLIC_PATH, { read: false })
  .pipe(clean())
  .pipe(connect.reload());
});

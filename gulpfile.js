var gulp = require('gulp'),
gutil = require('gulp-util'),
concat = require('gulp-concat'),
rename = require("gulp-rename"),
stylus = require('gulp-stylus'),
Ignore = require('gulp-ignore'),
uglify = require('gulp-uglify'),
Filter = require('gulp-filter'),
nib = require('nib'),
cssmin = require('gulp-cssmin'),
nodemon = require('gulp-nodemon'),
inject = require('gulp-inject'),
bowerFiles = require('main-bower-files');

var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('vendor',function(){
  var filterjs = Filter('**/*.js');
  var filtercss = Filter('**/*.css');

  return gulp.src(bowerFiles())
  .pipe(filtercss)
  .pipe(cssmin())
  .pipe(concat('vendor.css'))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./dist/style'))
  .pipe(filtercss.restore())
  .pipe(filterjs)
  .pipe(concat('vendor.js'))
  .pipe(uglify({mangle: false}))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./dist/scripts'))
  .pipe(filterjs.restore());
});

gulp.task('css-min',function(){
  var filter = Filter('**/*.styl');

  return gulp.src([
    './src/style/import.styl',
    './src/style/**/*.css'
  ])
  .pipe(filter)
  .pipe(sourcemaps.init())
  .pipe(stylus({
    use:nib(),
    sourcemap: {inline: true},
    compress: true
  }))
  .pipe(filter.restore())
  .pipe(cssmin())
  .pipe(concat('base.css'))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./dist/style'))
  .pipe(browserSync.stream());
});

gulp.task('unifyjs',function(){
  return gulp.src('./src/scripts/**/*.js')
  .pipe(concat('app.js'))
  .pipe(uglify({mangle: false}).on('error', gutil.log))
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('copy-html', function(){
  var sources = gulp.src([
    'scripts/vendor.min.js',
    'scripts/**/*.js',
    'style/vendor.min.css',
    'style/**/*.css'
  ], {read: false,cwd: __dirname + '/dist/'});

  return gulp.src('./src/views/**/*.html')
  .pipe(inject(sources))
  .pipe(gulp.dest('./dist/views'));
});

gulp.task('start',function () {
  nodemon({
    script: 'index.js',
    env: {
      'NODE_ENV': 'development'
    }
  })
  .on('restart', function () {
    console.log('restarted!');
  });
});

gulp.task('compile',['vendor','copy-html','css-min','unifyjs']);

gulp.task('serve',['vendor','copy-html','css-min','unifyjs','start'],function(){
  browserSync.init({
    proxy: "localhost:5000",
    notify: false
  });

  gulp.watch('./bower_components/**/*', ['vendor']);

  gulp.watch('./src/views/**/*.html', ['copy-html']).on('change', browserSync.reload);

  gulp.watch([
    './src/style/**/*.styl',
    './src/style/**/*.css'
  ],['css-min']);

  gulp.watch('./src/scripts/**/*.js', ['unifyjs']).on('change', browserSync.reload);
});

gulp.task('default',['serve']);

// Load plugins
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssshrink    = require('gulp-cssshrink');
var livereload   = require('gulp-livereload');
var minifyCSS    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var sass         = require('gulp-ruby-sass');
var size         = require('gulp-size');
var uglify       = require('gulp-uglify');

// Styles
gulp.task('styles', function () {
  return gulp.src(['src/scss/**/*.scss'])
    .pipe(sass({ style: 'compact', precision: 7, sourcemap: true }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(size({ title: 'CSS' }))
    .pipe(gulp.dest('dist/css'));
});

// Minify CSS
gulp.task('minify_css', ['styles'], function () {
  return gulp.src(['dist/css/collectorium.css'])
    .pipe(minifyCSS())
    .pipe(cssshrink())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(size({ title: 'Minified CSS' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

// Minify JS
gulp.task('minify_js', function() {
  gulp.src(['src/js/**/*.js'])
    .pipe(size({ title: 'JS' }))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(size({ title: 'Minified JS' }))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

// Watch
gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', ['styles', 'minify_css']);
  gulp.watch('src/js/**/*.js', ['minify_js']);
});

// Default
gulp.task('default', function () {
  gulp.start('watch');
});
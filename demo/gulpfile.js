// Load plugins
var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssshrink    = require('gulp-cssshrink');
var livereload   = require('gulp-livereload');
var minifyCSS    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var sass         = require('gulp-ruby-sass');

// Styles
gulp.task('styles', function () {
  return gulp.src(['scss/**/*.scss'])
    .pipe(sass({ style: 'compact', precision: 7, sourcemap: true }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('css'));
});

// Minify CSS
gulp.task('minify_css', ['styles'], function () {
  return gulp.src(['css/demo.css'])
    .pipe(minifyCSS())
    .pipe(cssshrink())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

// Watch
gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['styles', 'minify_css']);
});

// Default
gulp.task('default', function () {
  gulp.start('watch');
});
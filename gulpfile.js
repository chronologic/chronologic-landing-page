'use strict';

const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const del = require('del');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const pump = require('pump');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

const jsFiles = [
  'js/vendor/modernizr-2.8.3.min.js',
  'js/vendor/jquery-3.2.0.min.js',
  'js/vendor/jquery.classycountdown.min.js',
  'js/vendor/jquery.knob.js',
  'js/vendor/froogaloop2.min.js',
  'js/vendor/owl.carousel.min.js',
  'js/vendor/jquery.throttle.js',
  'js/vendor/moment.min.js',
  'js/vendor/moment-timezone.min.js',
  'js/vendor/eac-counter.browser.js',
  'js/src/main.js',
];

gulp.task('styles', function (cb) {
  pump([
      gulp.src('./css/src/style.css'),
      autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
      csso(),
      rename('style.min.css'),
      gulp.dest('./css')
    ],
    cb
  );
});

gulp.task('scripts', function (cb) {
  pump([
      gulp.src(jsFiles),
      concat('scripts.min.js'),
      gulp.dest('./js'),
      uglify(),
      gulp.dest('./js')
    ],
    cb
  );
});

gulp.task('clean', () => del(['./css/style.min.css', './js/scripts.min.js']));

gulp.task('default', ['clean'], function () {
  runSequence(
    'styles',
    'scripts'
  );
});
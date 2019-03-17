'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');


module.exports = function(options) {

  return () => {
    return gulp.src(options.src)
      .pipe($.newer(options.dest))
      .pipe($.debug({title: 'Скільки перекинуло FONTS:'}))
      .pipe(gulp.dest(options.dest))
  };
};
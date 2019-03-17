'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const imageMin = require('gulp-imagemin');


module.exports = function(options) {

  return () => {
    return gulp.src([options.src, options.ignore])
      .pipe($.newer(options.dest))
      .pipe($.debug({title: 'Скільки перекинуло IMG:'}))
      .pipe(gulpIf(options.isDevelopment, imageMin([
        imageMin.gifsicle({interlaced: true}),
        imageMin.jpegtran({progressive: true}),
        imageMin.optipng({optimizationLevel: 5}),
        imageMin.svgo({
          plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
          ]
        })
      ])))
      .pipe(gulp.dest(options.dest));
  };
};
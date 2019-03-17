'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const revReplace = require('gulp-rev-replace');


module.exports = function(options) {

  return () => {
    return gulp.src(options.src, {since: gulp.lastRun('html')})
      .pipe($.pug())
      .pipe($.if(!options.isDevelopment, revReplace({
        manifest: gulp.src(options.manifest + '/manifest.json', {allowEmpty: true})
      })))
      .pipe($.newer(options.dest))
      .pipe($.debug({title: 'Скільки перекинуло HTML:'}))
      .pipe(gulp.dest(options.dest))
  };

};
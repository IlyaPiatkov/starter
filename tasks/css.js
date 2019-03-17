'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');


module.exports = function(options) {

  return () => {
    return gulp.src(options.src)
      .pipe($.if(options.isDevelopment, $.sourcemaps.init()))
      .pipe($.sass().on("error", $.notify.onError({
        message: "Тут =>: <%= error.message %>",
        title: "Довбойоб поправ стилі"
      })))
      .pipe($.if(options.isDevelopment, $.autoprefixer({
        browsers: ['ie >= 10', 'last 3 versions'],
        cascade: false
      })))
      .pipe($.if(!options.isDevelopment, $.uncss({
        html: [options.destHtml]
      })))
      // .pipe($.newer(options.destCss))
      .pipe($.if(!options.isDevelopment, $.csso()))
      .pipe($.debug({title: 'Скільки перекинуло CSS:'}))
      .pipe($.if(options.isDevelopment, $.sourcemaps.write()))
      .pipe($.if(!options.isDevelopment, $.rev()))
      .pipe(gulp.dest(options.destCss))
      .pipe($.if(!options.isDevelopment, $.rev.manifest('manifest.json', {
        merge: true
      })))
      .pipe($.if(!options.isDevelopment, gulp.dest(options.manifest)))
  };
};
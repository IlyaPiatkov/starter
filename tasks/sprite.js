'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');
const gulpIf = require('gulp-if');
const imageMin = require('gulp-imagemin');


// const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
// const isDevelopment = process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {

  return () => {
    let spriteData = gulp.src(options.src)
      // .pipe($.spritesmith({
      //   imgName: 'sprite.png',
      //   cssName: '_sprite.scss',
      //   imgPath: '/img/sprites/sprite.png',
      //   algorithm: 'top-down'
      // }))

    let imgStream = spriteData.img
      // .pipe(gulpIf(isDevelopment, buffer()))
      // .pipe(gulpIf(isDevelopment, imageMin([
      //   imageMin.gifsicle({interlaced: true}),
      //   imageMin.jpegtran({progressive: true}),
      //   imageMin.optipng({optimizationLevel: 5}),
      //   imageMin.svgo({
      //     plugins: [
      //       {removeViewBox: true},
      //       {cleanupIDs: false}
      //     ]
      //   })
      // ])))
      .pipe(gulp.dest(options.dest));

    let cssStream = spriteData.css.pipe(gulp.dest('app/styles/'));

    return merge(imgStream, cssStream);
  };

};

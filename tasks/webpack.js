'use strict';

const $ = require('gulp-load-plugins')();
const path = require('path');
const gulp = require('gulp');
const webpackStream = require('webpack-stream');
const webpack = webpackStream.webpack;
const named = require('vinyl-named');


module.exports = function(options) {

  return () => {
    // let firstBuildReady = false
  
    // function done(err, stats) {
    //   firstBuildReady = true
    
    //   if (err) {
    //     return
    //   }
    
    //   gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
    //     colors: true,
    //   }))
    // }

    let webpackConfig = {
      output: {
        publicPath: '/js/',
        filename: options.isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
      },
      watch:   options.isDevelopment,
      devtool: options.isDevelopment ? 'cheap-module-inline-source-map' : null,
      // module:  {
      //   loaders: [{
      //     test:    /\.js$/,
      //     include: path.resolve(__dirname, 'app/js'),
      //     loader:  'babel?presets[]=es2015'
      //   }]
      // },
      module: {
        rules: [{
          test: /\.js$/,
          include: path.resolve(__dirname, 'app/js'),
          use: {
            loader:  'babel?presets[]=es2015',
          },
        },],
      },
      // plugins: [
      //   new webpack.NoErrorsPlugin()
      // ]
    };
    
    return gulp.src(options.src)
      .pipe($.plumber({
        errorHandler: $.notify.onError((err) => ({
          title: 'Webpack',
          message: err.message,
        })),
      }))
      .pipe(named())
      .pipe(webpackStream(webpackConfig))
      .pipe($.if(!options.isDevelopment, $.uglify()))
      .pipe(gulp.dest(options.dest))
      // .on('data', () => {
      //   if (firstBuildReady) {
      //     cb()
      //   }
      // })
  }
}


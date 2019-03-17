'use strict';

const browserSync = require('browser-sync').create();


module.exports = function(options) {

  return () => {
    browserSync.init({
      server: options.server,
      port: 3100,
      open: false,
    })
  
    browserSync.watch(options.watch)
      .on('change', browserSync.reload);
  }
}
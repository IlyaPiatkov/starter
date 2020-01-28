const gulp = require('gulp');


const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

const path = {
  dest: {
    html: './public/templates/',
    css: './public/templates/css/',
    js: './public/templates/js/',
    img: './public/templates/img/',
    imgSprites: './public/templates/img/sprites/',
    fonts: './public/templates/fonts/',
  },
  src: {
    html: 'app/pages/*.pug',
    css: 'app/styles/main.scss',
    js: 'app/js/*.js',
    img: 'app/img/**/*.*',
    imgAll: 'app/img/**/*.{jpg,jpeg,png,gif}',
    fonts: 'app/fonts/**/*.*',
  },
  watch: {
    html: ['app/blocks/**/*.pug', 'app/pages/**/*.pug'],
    css: ['app/styles/**/*.scss', 'app/blocks/features/**/*.scss', 'app/blocks/ui/**/*.scss'],
    js: 'app/js/**/*.js',
    img: 'app/img/**/*.{jpg,jpeg,png,gif}',
    imgSprites: 'app/img/sprites/**/*.*',
    fonts: 'app/fonts/**/*.*',
  },
  browserSync: {
    server: './public/templates',
    watch: 'public/**/*.*',
  },
  clean: './public',
  tmp: '/tmp/',
  manifest: 'manifest',
};

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

lazyRequireTask('server', './tasks/server', {
  server: path.browserSync.server,
  watch: path.browserSync.watch
});

lazyRequireTask('html', './tasks/html', {
  src: path.src.html,
  dest: path.dest.html,
  manifest: path.manifest,
  isDevelopment: isDevelopment
});

lazyRequireTask('lint:pug', './tasks/lint-pug', {
  src: path.src.html
});

lazyRequireTask('sprite', './tasks/sprite', {
  src: path.src.imgSprites,
  dest: path.dest.imgSprites
});

lazyRequireTask('img', './tasks/img', {
  src: path.src.img,
  ignore: `!${path.src.imgSprites}`,
  dest: path.dest.img,
  isDevelopment: isDevelopment
});

lazyRequireTask('css', './tasks/css', {
  src: path.src.css,
  destHtml: `${path.dest.html}*.html`,
  destCss: path.dest.css,
  manifest: path.manifest,
  isDevelopment: isDevelopment
});

lazyRequireTask('font', './tasks/font', {
  src: path.src.fonts,
  dest: path.dest.fonts,
  destCss: path.dest.css,
});

lazyRequireTask('lint:js', './tasks/lint-js', {
  src: path.src.js,
  dest: path.dest.js,
  tmp: path.tmp
});

lazyRequireTask('clean', './tasks/clean', {
  src: path.clean
});

lazyRequireTask('webpack', './tasks/webpack', {
  src: path.src.js,
  dest: path.dest.js,
  isDevelopment: isDevelopment
});

gulp.task('watch', () => {
  gulp.watch(path.watch.html, gulp.series('html'));
  gulp.watch(path.watch.css, gulp.series('css'));
  gulp.watch([path.watch.img, `!${path.watch.imgSprites}`], gulp.series('img'));
  gulp.watch(path.watch.imgSprites, gulp.series('sprite'));
  gulp.watch(path.watch.fonts, gulp.series('font'));
});

// gulp.task('build', gulp.parallel('html', 'lint:pug', 'css', 'img', 'sprite', 'font', 'lint:js'));
gulp.task('build', gulp.parallel('html', 'lint:pug', 'css', 'img', 'font', 'webpack'));

gulp.task('production', gulp.series('clean', 'html', 'css', 'img', 'font', 'webpack'));

gulp.task('dev', gulp.series('build', gulp.parallel('server', 'watch')));

gulp.task('default', gulp.series('dev'));

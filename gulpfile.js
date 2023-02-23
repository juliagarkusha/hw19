const { src, dest, series, parallel, watch } = require('gulp');
const del = require('del');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const mode = require('gulp-mode')();
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

async function html() {
  src('./src/index.html')
    .pipe(dest('./dist'))
}

async function css() {
  src('./src/index.scss')
    .pipe(mode.development(sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({cascade: false}))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(mode.development(sourcemaps.write()))
    .pipe(dest('./dist'))
}

async function js() {
  src([
    './src/classes/*.js',
    './src/index.js',
  ])
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(dest('./dist'))
}

async function server() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  watch('./src/index.html', series(html, reloadBrowser));
  watch('./src/index.scss', series(css, reloadBrowser));
  watch('./src/**/*.js', series(js, reloadBrowser));
}

function reloadBrowser(done) {
  browserSync.reload()

  done();
}

async function clear() {
  del(['dist'])
}

async function buildTask() {
  series(clear, parallel(html, css, js))
}

module.exports = {
  build: buildTask,
  start: series(buildTask, server),
}

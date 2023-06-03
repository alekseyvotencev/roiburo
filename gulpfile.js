// npm -g install gulp-cli
// npm i -D gulp gulp-cli gulp-concat gulp-htmlmin gulp-autoprefixer gulp-clean-css gulp-sass sass gulp-sourcemaps browser-sync gulp-file-include del@5.1.0
const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const del = require('del');

const clean = () => {
    return del(['dist'])
}

const html = () => {
    return src('*.html')
        // .pipe(htmlMin({
        //     collapseWhitespace: true,
        // }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}

const files = () => {
    return src([
        'src/fonts/*.woff',
        'src/fonts/*.woff2',
        'src/images/**',
        'src/js/**',
    ], {
        base: 'src'
    })
        .pipe(dest('dist/src'))
}

const scssStyles = () => {
    return src('./src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()) // компилируем SASS в CSS
        .pipe(sourcemaps.write())
        .pipe(concat('main.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(dest('dist/src/css'))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream())
}

const fonts = () => {
    return src('./src/fonts/fonts.css')
        .pipe(dest('dist/src/fonts'))
}

const cssStyles = () => {
    return src('./src/css/*.css')
        .pipe(dest('dist/src/css'))
}

const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
}

watch(['./*.html'], html);
watch('./templates/*.html', html);
watch('./src/scss/**/*.scss', scssStyles);
watch('./src/js/**', files);
watch('./src/images/**', files)

exports.scssStyles = scssStyles;
exports.cssStyles = cssStyles;
exports.html = html;
exports.clean = clean;
exports.files = files;
exports.fonts = fonts;
exports.default = series(clean, files, html, fonts, scssStyles, cssStyles, watchFiles);
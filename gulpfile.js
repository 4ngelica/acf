const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCss = require('gulp-clean-css');
const prefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');


const server = browserSync.create();

const style = () =>
    gulp
	.src('scss/bundle.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix())
		.pipe(cleanCss({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist'));

const scripts = () =>
    gulp
    .src('js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))

const watchFiles = () => {
    server.init({
        proxy: 'http://localhost:5500',
    });

    gulp.watch(['scss/**/*.scss'], style);
    gulp.watch(['js/**/*.js'], scripts);
    gulp.watch('./*.php').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watchFiles;

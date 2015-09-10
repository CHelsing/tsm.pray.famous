/**
 * Created by wizardhuang on 9/10/15.
 */
/**
 * Created by wizardhuang on 9/2/15.
 */
var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');

var paths = {
    scripts: ['assets/js/**/*.js', '!assets/external/**/*.js'],
    images : 'assets/images/**/*',
    style  : 'assets/css/**/*',
    html   : '*.html',
    dist   : 'dist/'
};

// 清除目录
gulp.task('clean', function () {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['dist']);
});

// html 代码复制压缩
gulp.task('html', function () {
    return gulp.src(paths.html)
        .pipe(htmlmin())
        .pipe(gulp.dest(paths.dist));
});

// js 代码压缩合并
gulp.task('scripts', function () {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest(paths.dist + 'js'));
});

// 图片压缩优化
gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(paths.dist + 'img'));
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.images, ['images']);
    gulp.watch(paths.style, ['style']);
    gulp.watch(paths.html, ['html']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'html', 'scripts', 'images', 'watch']);

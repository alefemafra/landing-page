'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var fontmin = require('gulp-fontmin');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var ghPages = require('gulp-gh-pages');



const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Gulp task to minify CSS files
gulp.task('styles', function() {
    return gulp.src('./src/css/styles.css')
        .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
        .pipe(csso())
        .pipe(gulp.dest('./build/css'))
});


gulp.task('scripts', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
});


gulp.task('pages', function() {
    return gulp.src(['./src/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./build'));
});

gulp.task('img', () =>
    gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img'))
);

function minifyFont(text, cb) {
    gulp
        .src('src/fonts/*.ttf')
        .pipe(fontmin({
            text: text
        }))
        .pipe(gulp.dest('build/fonts'))
        .on('end', cb);
}

gulp.task('fonts', function(cb) {

    var buffers = [];

    gulp
        .src('index.html')
        .on('data', function(file) {
            buffers.push(file.contents);
        })
        .on('end', function() {
            var text = Buffer.concat(buffers).toString('utf-8');
            minifyFont(text, cb);
        });

});

gulp.task('deploy', function () {
    return gulp.src("./build/**/*")
    .pipe(deploy())
});

gulp.task('watch', function() {

    gulp.watch('src/css/*.css', function() {
        // run styles upon changes
        gulp.run('styles');
    });
    gulp.watch(['./src/**/*.html'], function() {
        // run styles upon changes
        gulp.run('pages');
    });
    gulp.watch('./src/js/**/*.js', function() {
        // run styles upon changes
        gulp.run('scripts');
    });

});

gulp.task('clean', () => del(['build']));


gulp.task('default', ['clean'], function() {
    runSequence(
        'styles',
        'scripts',
        'pages',
        'fonts',
        'img',
        'watch'
    );
});
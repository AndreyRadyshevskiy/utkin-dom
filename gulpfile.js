'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    newer = require('gulp-newer'),
    gulpIf = require('gulp-if'),
    del = require('del');

// NODE_ENV=production gulp <task> for production build
const isDevelopment =!process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('sass', function () {
  return gulp.src('src/scss/main.sass')
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          message: "Error: <%= error.message %>",
          title: "sass error"
        };
      })
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass({}))
    .pipe(autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe(gulpIf(!isDevelopment, csso()))
    .pipe(gulpIf(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('build/css/'));
});

gulp.task('serve', function(){
  browserSync.init({
    server: 'build',
    notify:false
    });    
  browserSync.watch('build/**/*.*').on('change', browserSync.reload);
});

gulp.task('clean', function(){
  return del([
    'build'
  ]);
});

gulp.task('fonts', function(){
  return gulp.src('src/fonts/**/*')
    .pipe(newer('build/fonts'))
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('images', function(){
  return gulp.src('src/img/**/*')
    .pipe(newer('build/img'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function() {
  return gulp.src('src/index.html')
  .pipe(gulp.dest('build'))
});

gulp.task('js', function(){
  return gulp.src('src/js/**/*')
    .pipe(babel())
    .pipe(gulp.dest('build/js'));
});

gulp.task('watch', function(){
  gulp.watch('src/fonts/**/*', gulp.series('fonts'));
  gulp.watch('src/img/**/*', gulp.series('images'));
  gulp.watch('src/index.html',gulp.series('html'));
  gulp.watch('src/scss/**/*.sass', gulp.series('sass'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('html', 'fonts', 'images', 'js', 'sass'),
  gulp.parallel('watch','serve')
));


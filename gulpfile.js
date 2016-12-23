var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');

const Path = {
  src: './assets/stylesheets/**/*.sass',
  entryPoint: './assets/stylesheets/styles.sass',
  output: './public/stylesheets/compiled/'
}

gulp.task('build-style', function () {
  var options = {
    outputStyle: 'compressed'
  };
  gulp.src(Path.entryPoint)
    .pipe(plumber())
    .pipe(sass(options).on('error', sass.logError))
    .pipe(plumber.stop())
    .pipe(autoprefixer({
      browsers: [
          '> 1%',
          'last 2 versions',
          'firefox >= 4',
          'safari 7',
          'safari 8',
          'IE 8',
          'IE 9',
          'IE 10',
          'IE 11'
      ],
      cascade: false
  }))
  .pipe(gulp.dest(Path.output))
});

gulp.task('watch-style', function() {
    livereload.listen();
    gulp.watch([Path.src], ['build-style']);
});

gulp.task('imagemin', function () {
    return gulp.src('./public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img/min/'));
});

gulp.task('build', ['build-style']);

gulp.task('default', ['build-style', 'watch-style']);

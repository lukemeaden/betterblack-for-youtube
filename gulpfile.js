var gulp 			    = require('gulp'),
    clean 		    = require('gulp-clean'),
    cleanCSS 	    = require('gulp-clean-css'),
    replace       = require('gulp-replace'),
    sass          = require('gulp-sass'),
    watch         = require('gulp-watch');

gulp.task('clean-css', function(){
  return gulp.src('dist/css/**/*.css', {read: false})
    .pipe(clean());
});

gulp.task('build-css', ['clean-css'], function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      processImport: false,
      mediaMerging: true
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('move-images', function(){
  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('move-fonts', function(){
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('move-ext', function(){
  return gulp.src('src/ext/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function(){
  gulp.watch(['src/scss/**/*.scss'], ['build-css']);
  gulp.watch(['src/images/**/*'], ['move-images']);
  gulp.watch(['src/ext/**/*'], ['move-ext']);
});

gulp.task('default', ['build-css', 'move-images' ,'move-fonts', 'move-ext', 'watch']);

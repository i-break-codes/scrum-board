/**
 * scrum-board
 *
 * @category   scrum-board
 * @author     Vaibhav Mehta <vaibhav@decodingweb.com>
 * @copyright  Copyright (c) 2016 Vaibhav Mehta <https://github.com/i-break-codes>
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @version    1.0 Beta
 */

var gulp         = require('gulp'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS     = require('gulp-clean-css'),
    uglify       = require('gulp-uglify'),
    renameFiles  = require('gulp-rename');
    
  gulp.task('browser-sync', function() {
    browserSync.init(null, {
      server: {
        // baseDir: "app",
        proxy: 'http://localhost:8888/scrum/',
        // files: ['app/views/**/*.*', 'public/**/*.css', 'public/**/*.js'],
        browser: 'google chrome',
        port: 3005,
        // open: false
      }
    });
  });
  
  gulp.task('bs-reload', function () {
    browserSync.reload();
  });
    
  gulp.task('css', function () {
    return gulp.src('src/stylesheets/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer('last 3 version'))
      .pipe(gulp.dest('app/assets/stylesheets'))
      .pipe(cleanCSS({debug: true}, function(details) {
        console.log('Original Size : ' + details.name + ': ' + details.stats.originalSize + ' bytes');
        console.log('Minified Size : ' + details.name + ': ' + details.stats.minifiedSize + ' bytes');
      }))
      .pipe(renameFiles({ suffix: '.min' }))
      .pipe(gulp.dest('app/assets/stylesheets'))
      .pipe(browserSync.reload({
        stream:true
      }));
  });
  
  
  gulp.task('js',function(){
    return gulp.src('src/scripts/**/*.js')
      .pipe(gulp.dest('app/assets/scripts'))
      .pipe(uglify())
      .pipe(renameFiles({ suffix: '.min' }))
      .pipe(gulp.dest('app/assets/scripts'))
      .pipe(browserSync.reload({
        stream: true, 
        once: true
      }));
  });
  
  gulp.task('default', ['js', 'css', 'browser-sync'], function () {
    gulp.watch("src/stylesheets/**/*.scss", ['css']);
    gulp.watch("src/scripts/**/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
  });
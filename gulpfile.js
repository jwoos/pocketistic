var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var csslint = require('gulp-csslint');
var autoPrefixer = require('gulp-autoprefixer');
//if node version is lower than v.0.1.2
require('es6-promise').polyfill();
var cssComb = require('gulp-csscomb');
var cmq = require('gulp-merge-media-queries');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var jade = require('gulp-jade');
var imageMin = require('gulp-imagemin');
var cache = require('gulp-cache');
var notify = require('gulp-notify');
gulp.task('sass', function(){
	gulp.src(['src/styles/**/*.sass'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoPrefixer())
		.pipe(cssComb())
		.pipe(cmq({log:true}))
		.pipe(csslint())
		.pipe(csslint.reporter())
		.pipe(gulp.dest('dist/styles'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/styles'))
		.pipe(reload({stream:true}))
		.pipe(notify('css task finished'))
});
gulp.task('js', function(){
	gulp.src(['src/scripts/**/*.js'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(jshint())
  		.pipe(jshint.reporter('default'))
		.pipe(gulp.dest('dist/scripts'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(reload())
  		.pipe(notify('js task finished'))
});
gulp.task('jade', function(){
	gulp.src(['src/**/*.jade'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(jade())
		.pipe(gulp.dest('dist/'))
		.pipe(reload())
		.pipe(notify('html task finished'))
});
gulp.task('image', function(){
	gulp.src(['src/images/**/*'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(cache(imageMin()))
		.pipe(gulp.dest('dist/images'))
		.pipe(reload())
		.pipe(notify('image task finished'))
});
gulp.task('default', function(){
	browserSync.init({
        server: "dist"
    });
	gulp.watch('src/scripts/**/*.js',['js']);
	gulp.watch('src/styles/**/*.sass',['sass']);
	gulp.watch('src/**/*.jade',['jade']);
	gulp.watch('src/images/**/*',['image']);
});

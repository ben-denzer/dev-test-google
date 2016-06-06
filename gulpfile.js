var gulp = require('gulp');
var sass = require('gulp-sass');
var jsFiles = ['*.js', 'src/**/*.js'];
var nodemon = require('gulp-nodemon');

gulp.task('sass', function () {
  return gulp.src('./public/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('default', ['sass:watch'], function() {
	var options = {
		script: 'app.js',
		delayTime: 1,
		env: {
			'PORT': 3000
		},
		watch: jsFiles
	};
	return nodemon(options).on('restart', function(e) {
		console.log('restart');
	});
});
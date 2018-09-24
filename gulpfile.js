var gulp = require('gulp');
var sass = require('gulp-sass');
var favicon = require('favicons').stream
// var gutil = require("gulp-")

gulp.task('sass', () => {
	return gulp.src('./css/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(gulp.dest('./css'));
})

gulp.task('sass:watch', function () {
	gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('icon', () => {
	return gulp.src("/static/img/open-diversity.png")
		.pipe(favicon())
		.pipe(gulp.dest('./_site'))
})

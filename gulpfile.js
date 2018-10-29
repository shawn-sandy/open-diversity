const gulp = require('gulp');
const sass = require('gulp-sass');
const favicon = require('favicons').stream
const prefix = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const gulpif = require('gulp-if')
const clean = require('gulp-clean')
// var gutil = require("gulp-")
const minimist = require('minimist')

const config = {
	string: 'env',
	default: { env: process.env.NODE_ENV || 'development' }
}

const options = minimist(process.argv.slice(2), config);

gulp.task('sass', () => {
	return gulp.src('./css/*.scss')
	.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(prefix({
			browsers: ['last 2 versions'],
            cascade: false
		}))
		.pipe(gulpif(options.env === 'development', sourcemaps.write('./maps')))
		.pipe(gulp.dest('./css'));
})

gulp.task('clean:maps', () => {
	return gulp.src('./css/maps', {read: false})
	.pipe(gulpif(options.env === 'production', clean()))
})


gulp.task('sass:watch', function () {
	gulp.watch('./css/**/*.scss', ['sass']);
});

gulp.task('icon', () => {
	return gulp.src("/static/img/open-diversity.png")
		.pipe(favicon())
		.pipe(gulp.dest('./_site'))
})

gulp.task('default', ['sass', 'clean:maps'])

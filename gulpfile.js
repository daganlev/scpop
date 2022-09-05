const gulp = require('gulp');
const del = require('del');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass')(require('sass'));
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify-es').default;

function cleanAll(){
    console.log('Cleaning Files');
    del([
            './scpop/*'
        ]);
}

function styles(){
    console.log('Updating Styles');
    return gulp.src('scss/*.scss', '!node_modules/**', '!scss/_*.scss')
        .pipe(sass())
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest(function(file){
            return file.base.replace("/scss","/scpop");
        }));
}

function scripts(){
    console.log('Updating Scripts');
    return gulp.src(['ts/*.ts', '!node_modules/**', '!ts/_*.ts'])
        .pipe(typescript())
        .pipe(uglify())
        .pipe(gulp.dest(function(file){
            return file.base.replace("/ts","/scpop");
        }));
}

function watch(){
    console.log('Watching...');
    gulp.watch('scss/*.scss', styles);
    gulp.watch('ts/*.ts', scripts);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

gulp.task('default', function(){
    cleanAll();
    styles();
    scripts();
    watch();
});
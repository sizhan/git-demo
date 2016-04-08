/**
 * Created by wxq on 2016/4/7.
 */
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var uglify=require('gulp-uglify');
var htmlmin=require('gulp-htmlmin');

/*less 编译 压缩  （合并一般没有必要，一般预处理css都可以导包，@import URL（‘’）*/
gulp.task('style',function(){
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles/'))
        .pipe(reload({
            stream: true
        }))
})
/*js 合并 混淆*/
var concat=require('gulp-concat')
gulp.task('script', function () {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(reload({
            stream: true
        }))
})
/*img图片的复制*/
gulp.task('img', function () {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({
            stream: true
        }))
})
/*html文件的压缩*/
 gulp.task('html', function () {
     gulp.src('src/index.html')
         .pipe(htmlmin({collapseWhitespace: true,removeComments:true}))
         .pipe(gulp.dest('dist/'))
         .pipe(reload({
             stream: true
         }))
 })
/*添加browsersync*/
var browserSync=require('browser-sync');
var reload = browserSync.reload;
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: ["dist"]
        }
    }, function (err,bs) {
        console.log(1)
    });
    gulp.watch('src/styles/*.less',['style'])
    gulp.watch('!src/styles/_*.less',['style'])
    gulp.watch('src/scripts/*.js',['script'])
    gulp.watch('src/images/*.*',['img'])
    gulp.watch('src/index.html',['html'])
})
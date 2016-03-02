var gulp = require('gulp'),
    config = require('./gulp.config'),
    sass = require('gulp-sass'),
    bourbon = require('node-bourbon'),
    browserSync = require('browser-sync'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    image = require('gulp-image'),
    reload = browserSync.reload;

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bower.paths.dir));
});

gulp.task('pants', function() {
    console.log('pants');
});

gulp.task('sass', function() {
    gulp.src(config.sass.paths.src)
        .pipe(sass({
            includePaths: require('node-bourbon').with(config.bower.paths.dir + '/bootstrap-sass/assets/stylesheets',
                config.bower.paths.dir + '/font-awesome/scss'),
            css: 'css',
            sass: 'sass',
        }))
        .on('error', sass.logError)
        .pipe(gulp.dest('build/dev/css'))
        .pipe(browserSync.stream());
});



gulp.task('html', function() {
    gulp.src(config.html.paths.src)
        .pipe(gulp.dest(config.html.paths.output.dev))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('images', function() {
    gulp.src(config.images.paths.src)
        .pipe(image())
        .pipe(gulp.dest(config.images.paths.output.dev));
});

gulp.task('jazzhands', function() {
    return gulp.src([
            './bower_components/jquery/dist/jquery.js', 
            './bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
            config.scripts.paths.src
        ])
        .pipe(concat('function.js'))
        .on('error', onError)
        .pipe(gulp.dest(config.scripts.paths.output.dev))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: config.html.paths.output.dev
        }
    });
});



gulp.task('watch', function() {
    gulp.watch(config.sass.paths.watch, ['sass']);
    gulp.watch(config.html.paths.src, ['html']);
    gulp.watch(config.scripts.paths.src, ['jazzhands']);
    gulp.watch(config.images.paths.src, ['images']);

});


gulp.task('default', ['sass', 'html', 'jazzhands', 'images', 'browser-sync', 'watch'
]);

function onError(err) {
    console.log(err);
    this.emit('end');
}

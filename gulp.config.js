var dest = './build';
var src = './src';
var demoSrc = './demos';

module.exports = {
    sass: {
        paths: {
            watch: src + '/scss/**/*.scss',
            src: src + '/scss/**/*.scss',
            output: {
                dev: dest + '/dev/css',
                prod: dest + '/prod/css'
            }
        }
    },
    html: {
        paths: {
            src: src + '/html/**/*.html',
            output: {
                dev: dest + '/dev/',
                prod: dest + '/prod/'
            }
        }
    },

    images: {
        paths: {
            src: src + '/images/**/*.*',
            output: {
                dev: dest + '/dev/images',
                prod: dest + '/prod/images'
            }
        }
    },

    scripts: {
        paths: {
            src: src + '/js/**/*.js',
            output: {
                dev: dest + '/dev/js',
                prod: dest + '/prod/js'
            }
        }
    },
    bower: {
        paths: {
            dir: './bower_components'
        }
    }
};

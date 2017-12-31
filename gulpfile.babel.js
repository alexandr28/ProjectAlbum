import gulp from 'gulp';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';
import autoprefixer from 'gulp-autoprefixer';
import less from 'gulp-less';
import eslint from 'gulp-eslint';
import copy from 'gulp-copy';
import pug from 'gulp-pug';
import imageOp from 'gulp-imagemin';
import plumer from 'gulp-plumber';

const server = browserSync.create();

const postCSSPlugins = [
    cssnano({
        autoprefixer: {
            add: true
        }
    })
];

gulp.task('copy',() =>
gulp.src('./dev/**/*.html')
    .pipe(plumer())
    .pipe(gulp.dest('./public'))
);

gulp.task('image', () =>
gulp.src('./dev/img/**/*')
    .pipe(imageOp([
        imageOp.gifsicle({interlaced: true}),
        imageOp.jpegtran({progressive: true}),
        imageOp.optipng({optimizationLevel: 5}),
        imageOp.svgo({
            plugins:[
                {removeViewBox: true},
                {cleanup:false}
                ]
        })
    ]))
    .pipe(plumer())
    .pipe(gulp.dest('./public/img'))
);

gulp.task('es6',() =>
gulp.src('./dev/js/*.js')
    .pipe(plumer())
    .pipe(babel())
    .pipe(gulp.dest('./public/js'))
);

gulp.task('sass',() =>
gulp.src('./dev/sass/*.scss')
    .pipe(plumer())
    //.pipe(autoprefixer())
    .pipe(sass({includePaths: ['scss']}))
    .pipe(postcss(postCSSPlugins))
    .pipe(gulp.dest('./public/css'))
);

gulp.task('less',() =>
gulp.src('./dev/less/**/*.less')
    .pipe(plumer())
    .pipe(less())
    //.pipe(postcss(postCSSPlugins))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'))
    .pipe(server.reload.stream({match:'**/*.css'}))
);

gulp.task('lint',() =>
gulp.src(['**/*.js','!node_modules/**'])
    .pipe(plumer())
    .pipe(eslint())
    .pipe(eslint.format())
);

gulp.task('pug', () =>
gulp.src('./dev/pug/*.pug')
    .pipe(plumer())
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./public'))
);

gulp.task('default',() =>{
    server.init({
    server:{
        baseDir: './public'
    }
});
gulp.watch('./dev/js/*.js',['es6','lint',server.reload]);
gulp.watch('./dev/**/*.html',['copy',server.reload]);
gulp.watch('./dev/**/*.css',['copyCss',server.reload]);
gulp.watch('./dev/img/**/*',['image',server.reload]);
gulp.watch('./dev/sass/**/*.scss',['sass',server.reload]);
gulp.watch('./dev/pug/*.pug',['pug',server.reload]);
gulp.watch('./dev/less/**/*.less',['less']);
});
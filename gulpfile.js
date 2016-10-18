/**
 *
 * @description gulpfile配置文件
 * @author 吴家荣 <jiarongwu.se@foxmail.com>
 *
 */

const gulp = require('gulp');
const less = require('gulp-less');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const inject = require('gulp-inject');
const rev = require('gulp-rev');
const del = require('del');
const gulpsync = require('gulp-sync')(gulp);
const browserSync = require('browser-sync').create();
const server = require('gulp-develop-server');
const path = require('path');

/**
 *
 * @description 开发时编译less文件
 *
 */

gulp.task('less:dev', function() {
  return gulp.src('./src/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/dev/css'));
});

/**
 *
 * @description 上线时编译less文件
 *
 */

gulp.task('less:build', function() {
  return gulp.src('./src/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(concat('simple_ucp-min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rev())
    .pipe(gulp.dest('./public/pro/css'));
});

/**
 *
 * @description 编译pug文件
 *
 */

gulp.task('pug', function() {
  return gulp.src('./src/**/*.pug')
    .pipe(pug())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./public/html'));
});

/**
 *
 * @description 开发时编译es6文件
 *
 */

gulp.task('babel:dev', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./public/dev/js'));
});

/**
 *
 * @description 上线时编译es6文件
 *
 */

gulp.task('babel:build', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('simpme_ucp-min.js'))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/pro/js'));
});

/**
 *
 * @description inject命令Option对象
 *
 */

let injectOptions = {
  transform: function (filepath, file, i, length) {
    filepath = filepath.substr(7);
    return inject.transform.apply(inject.transform, arguments);
  }
};

/**
 *
 * @description 取得需要注入的文件
 * @return {array} 需要注入的文件的字符串数组
 *
 */

function getInjectFiles() {
  return [
    './public/dev/css/**/*.css',
    './public/bower_components/AdminLTE/bootstrap/css/bootstrap.min.css',
    './public/bower_components/AdminLTE/dist/css/AdminLTE.min.css',
    './public/bower_components/AdminLTE/dist/css/skins/_all-skins.min.css',
    './public/bower_components/font-awesome/css/font-awesome.min.css',
    './public/bower_components/Ionicons/css/ionicons.min.css',

    './public/bower_components/AdminLTE/plugins/jQuery/jquery-2.2.3.min.js',
    './public/bower_components/AdminLTE/bootstrap/js/bootstrap.min.js',
    './public/bower_components/AdminLTE/plugins/fastclick/fastclick.min.js',
    './public/bower_components/AdminLTE/plugins/chartjs/Chart.min.js',
    './public/bower_components/angular/angular.min.js',
    './public/bower_components/angular-resource/angular-resource.min.js',
    './public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
    './public/dev/js/**/*.js',
    './public/bower_components/AdminLTE/dist/js/app.min.js',
  ];
}

/**
 *
 * @description 开发时inject命令
 *
 */

gulp.task('inject:dev', ['less:dev', 'pug', 'babel:dev'], function() {
  let target = gulp.src('./public/html/views/app.view.html');
  let sources = gulp.src(getInjectFiles(), { read: false });

  return target.pipe(inject(sources, injectOptions))
    .pipe(gulp.dest('./public/html/views/'));
});

/**
 *
 * @description 上线时inject命令
 *
 */

gulp.task('inject:build', ['less:build', 'pug', 'babel:build'], function() {
  let target = gulp.src('./public/html/views/app.view.html');
  let sources = gulp.src(getInjectFiles(), { read: false });

  return target.pipe(inject(sources, injectOptions))
    .pipe(gulp.dest('./public/html/views/'));
});

/**
 *
 * @description 构建上线的所有文件：html, css, js
 *
 */

gulp.task('build', function() {
  del(['./public/pro/', './public/html/']).then(function(paths) {
    gulp.start(['inject:build']);
  });
});

/**
 *
 * @description 启动浏览器，代理3000端口
 *
 */

gulp.task('browser', function() {

  setTimeout(function() {
    browserSync.init({
      proxy: 'http://localhost:3000'
    });
  }, 1000);

});

/**
 *
 * @description 根据文件路径取得文件类型
 * @param {string} path 文件路径
 *
 */

function getFileType(path) {
  return path.substr(path.lastIndexOf('.') + 1);
}

/**
 *
 * @description 取得文件路径，目的是编译文件后，取得目的目录
 * @param {string} type 文件类型：html, css, js
 * @param {string} path 文件路径
 *
 */

function getFilePath(type, path) {
  let dir = path.substring(path.lastIndexOf('src/') + 4, path.lastIndexOf('/'));
  if (type === 'html') {
    return `./public/html/${dir}`;
  } else {
    return `./public/dev/${type}/${dir}`;
  }
}

/**
 *
 * @description gulp任务：重新启动watch任务
 *
 */

gulp.task('watch:restart', ['inject:dev'], function() {
  gulp.start(['watch']);
});

/**
 *
 * @description gulp任务，执行服务端脚本
 *
 */

gulp.task('server', function() {
  server.listen({
    path: './server.js'
  });
});

/**
 *
 * @description gulp任务，监听文件变化，并且重新编译变化的文件，同时根据情况reload浏览器或者重新执行服务端代码
 *
 */

gulp.task('watch', ['inject:dev'], function() {
  gulp.watch(['./src/**/*.*', './server.js'], function(event) {
    let eventType = event.type;
    let filePath = event.path;
    let fileType = getFileType(filePath);

    if (filePath.substr(filePath.length - 9) === 'server.js') {
      setTimeout(server.restart, 0);
      setTimeout(browserSync.reload, 1000);
      return;
    }

    if (eventType === 'changed') {
      if (filePath.substr(filePath.lastIndexOf('/') + 1) === 'app.view.pug') {
        gulp.start(['watch:restart']);
      }
      switch (fileType) {
        case 'pug': {
          gulp.src(filePath).pipe(pug()).pipe(gulp.dest(getFilePath('html', filePath)));
          break;
        }
        case 'less': {
          gulp.src(filePath).pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
          })).pipe(gulp.dest(getFilePath('css', filePath)));
          break;
        }
        case 'js': {
          gulp.src(filePath).pipe(babel({
            presets: ['es2015']
          })).pipe(gulp.dest(getFilePath('js', filePath)));
          break;
        }
      }
      setTimeout(browserSync.reload, 1000);
    } else {
      gulp.start(['watch:restart']);
    }

  });
});

/**
 *
 * @description gulp default任务
 *
 */

gulp.task('default', gulpsync.sync(['watch', 'server', 'browser']));

var gulp = require('gulp');
var exec = require('child_process').exec;
var color = require('color');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
});


// 一键启动
gulp
    .task('server', function () {
        new Promise(function (resolve, reject) {
            exec('mongo admin --eval "db.shutdownServer()"', function (err, stdout, stderr) {
                exec('mongod --dbpath=./db --port 27017', function (err, stdout, stderr) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                });
                resolve();
            });
        }).then(function () {
                console.log('启动数据库服务');

                nodemon({
                    script: 'app.js',
                    ext: 'js coffee jade ejs es',
                    ignore: 'gulpfile.babel.js',
                    env: {'NODE_ENV': 'development'},
                    stdout: true
                }).on('restart', function () {
                    connect.reload()
                })
            }, function () {
                console.log('启动数据库服务错误, error: ' + err);
            });
    });


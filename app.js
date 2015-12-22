var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var fs = require('fs');
var morgan = require('morgan'); // 记录日志的模块

var port = process.env.PORT || 3000;
var app = express();

//连接本地数据库

/*
 * 注意命令行开启mangodb服务:
 * mongod --dbpath=./db --port 27017
 * ps:把数据库存放在了项目的根目录`bd`文件夹下,要确保`db`文件夹的存在
 * */

mongoose.connect('mongodb://127.0.0.1/manage');

mongoose.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});

mongoose.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

//视图文件的路径
app.set('views', './views/pages');

//使用的模板引擎
app.set('view engine', 'ejs');

//设置jade不换行
app.locals.pretty = true;

//中间件:获取body数据
app.use(bodyParser.urlencoded({extended: true}));   // extended默认为false,只能接受字符串或数组
app.use(bodyParser.json()); // 把返回值转成json格式

//中间件:session设置
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 1200000}  //session时长为20秒
}));

// stylus编译
app.use(require("stylus").middleware({
    src: './public/style',
    compress: true
}));

//静态资源的路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

//日志:访问记录
if (!fs.existsSync(__dirname + '/log/')) {
    fs.mkdirSync(__dirname + '/log/');
}
var accessLog = fs.createWriteStream(__dirname + '/log/access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLog}));

//页面路由
var routes = require('./routes');
app.use(routes(app));

//设置端口号
app.listen(port, function () {
    console.log('项目启动成功, 端口号: ' + port);
});
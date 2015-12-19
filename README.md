# Sell-SP
卖学习网站-主打视频资料库建设，动物组织建立
# Sell-SP
基于node的站点建设

1. [安装node环境](https://nodejs.org/en/)
2. 在项目根目录下运行`npm install`安装项目的依赖模块
3. 在项目根目录下运行`bower install`安装页面所依赖的插件
4. 在项目根目录下运行`mongod --dbpath=./db --port 27017`启动mangoDB(把数据库存放在了项目的根目录`bd`文件夹下,如果没有请手动创建个空文件夹`mkdir db`)
5. 另启一个控制台,运行`nodemon app.js`或者`node app.js`(前者可以检测文件更改自动重启服务器)
6. 访问网址: [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

## 框架&工具

### 服务端
1. Express
2. mongod
3. mongoose
4.ejs

...

### 客户端
1. bootstrap 暂定
2. jquery

## 用户名/密码

> 用户名: admin

> 密码: xxxx

## 需要实现的功能
1. 后台模块的添加,支持无限级添加
2. 通过后台修改前台数据的增删改查
3. 图片/视频的上传
4. 日志管理:登录日志
5. 后台登录逻辑
6. 待续

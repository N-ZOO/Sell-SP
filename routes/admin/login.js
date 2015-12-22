var crypto = require('crypto');
var adminUser = require('../../models/adminUser');

module.exports = function (app) {
    app.route('/admin/login')
        .post(function (req, res) {
            adminUser.findOneData({userName: req.body.user.name, password: crypto.createHash('md5').update(req.body.user.password).digest('hex')}, function (err, doc) {
                if (err) return next(err);
                if (!doc) return res.send('<p>用户名或密码错误</p>');

                //session存储用户名,根据它判断是否登录
                req.session.loggedIn = req.body.user.name;

                //session保存上次登录的ip和时间
                req.session.lastIp=doc.meta.ip;
                req.session.lastTime=doc.meta.time;

                //保存本次登录的ip和时间
                adminUser.updateSet({'userName': req.session.login}, {'meta': {'ip': getIp(req), 'time': Date.now()}});

                // 页面重定向
                res.redirect('/admin');
            });
        })
        .get(function (req, res) {
            if (req.session.loggedIn) {
                res.redirect('/admin');
            } else {
                res.render('admin/login', {});
            }
        });
    app.route('/admin/logout')
        .get(function (req, res) {
            for(var key in req.session){
                if(key==='cookie'){
                    continue;
                }
                delete req.session[key];
            }
            res.redirect('/admin/login');
        });
};

// 获得ip地址
function getIp(req) {
    var ipStr=req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    return ipStr.replace('::ffff:','');
}

var errorCatch = require('../../models/errorCatch');

var adminUser = require('../../models/adminUser');
var moment = require('../../public/libs/moment/moment');

module.exports = function (app) {
    app.route('/admin')
        .get(function (req, res) {
            adminUser.findOneData({'userName': req.session.login}, function (err, doc) {
                if (err) {
                    errorCatch(req, res, err);
                    return false;
                }

                //渲染页面
                app.locals.moment = moment;
                res.render('admin/index', {
                    title: '管理首页',
                    userInfo: doc,
                    loginInfo: {
                        currentIp: getIp(req),
                        lastIp: req.session.lastIp,
                        lastTime: req.session.lastTime
                    },
                   // siteInfo: siteInfo.info,
                  //  catalogue: manageModule.catalogue
                });

            });
        });

    // 获得ip地址
    function getIp(req) {
        var ipStr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress ||
            '127.0.0.1';

        return ipStr.replace('::ffff:', '');
    }
};
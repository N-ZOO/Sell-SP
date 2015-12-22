var mongoose = require('mongoose');
var siteInfoSchema = require('../schemas/siteInfo');
var siteInfo = mongoose.model('site-info', siteInfoSchema);

var os = require('os');
var _ = require('underscore');

//--------------------------------------------------【获得平台信息】

function getIp() {
    var interfaces = os.networkInterfaces();
    var IPv4 = '127.0.0.1';
    for (var key in interfaces) {
        interfaces[key].forEach(function (details) {
            if (details.family == 'IPv4' && key == 'en0') {
                IPv4 = details.address;
            }
        });
    }
    return IPv4;
}

// 站点信息的缓存对象
siteInfo.info = {
    hostname: os.hostname(),
    type: os.type(),
    platform: os.platform(),
    release: os.release(),
    ip: getIp()
};

siteInfo.getSiteInfo = function () {
    return new Promise(function (resolve, reject) {
        siteInfo.findOne({}, function (err, docs) {
            if (err) {
                reject(err);
            }

            siteInfo.info = _.extend(siteInfo.info, docs);
            resolve();
        });
    });
};

siteInfo.getSiteInfo();

module.exports = siteInfo;

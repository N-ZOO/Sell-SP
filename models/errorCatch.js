/**
 * 错误捕捉
 *
 * 生成统一的错误格式并路由到错误页面
 * */
module.exports = function (req, res, err) {
    var errObj = {};

    errObj.title = err.name;
    errObj.message = err.message;
    errObj.more = err;

    if (err.name === 'CastError') {
        errObj.title = '页面id错误';
        errObj.message = '当前访问的页面不存在!!';
    }

    // 错误信息返回方式,ajax为true,普通为false
    if (req.headers['x-requested-with'] && req.headers['x-requested-with'].toLowerCase() == 'xmlhttprequest') {
        res.send({
            resultCode: 0,
            errorCode: 404,
            resultMsg: '访问的路径不存在!!'
        });
    } else {
        res.render('tips/error', errObj);
    }
};
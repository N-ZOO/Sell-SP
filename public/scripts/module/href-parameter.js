/**
 * href参数读写      1.1.2
 *
 * eg:
 *
 * //根据当前页的url获取/设置参数
 * hrefParameter.get(key);
 * hrefParameter.set(key,value);
 *
 * //指定url获取/设置参数
 * hrefParameter.create(url).set(key);
 * hrefParameter.create(url).get(key,value);
 *
 * Ps:
 *  1. get接口:获得指定的参数,如果该key不存在返回空字符串,如果不传key,返回`&`连接的所有参数字符串
 *  1. set接口:设置指定的参数,如果不存在则添加
 *
 *
 */
(function (root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function () {
            return factory(root, {});
        });
    } else {
        root.hrefParameter = factory(root, {});
    }
})(this, function (root) {

    var hrefParameter = (function () {

        var _create = function (href) {
            var href = href || root.location.href;  // 如果未传参,就取页面的url

            return {
                get: function (key) {
                    var patternOne = new RegExp('[?|&]' + key + '\\=(.*?)(#|&|$)', 'ig'),
                        patternAll = new RegExp('\\?(.*?)(#|$)', 'ig');

                    if (key) {
                        if (patternOne.test(href)) {
                            return RegExp.$1
                        }
                    } else {
                        if (patternAll.test(href)) {
                            return RegExp.$1
                        }
                    }

                    return '';
                },

                set: function (key, val) {
                    var pattern = '([?|&])' + key + '=[^&]*',
                        replaceText = key + '=' + val,
                        regResult=href.match(pattern);

                    if (regResult) {
                        return href.replace(regResult[0], regResult[1] + replaceText);
                    } else {
                        var patternAll = new RegExp('(.*?)(#|$)', 'i');
                        if (href.indexOf('?') != -1) {
                            return href.replace(patternAll, '$1&' + replaceText + '$2');
                        } else {
                            return href.replace(patternAll, '$1?' + replaceText + '$2');
                        }
                    }
                },

                del: function (key) {
                    var pattern = key + '=([^&#]*)',
                        patternAll = new RegExp('\\?(.*?)(#|$)', 'ig');

                    if (href.match(pattern)) {
                        var tmp = new RegExp('(' + key + ')=([^&#]*)', 'gi');
                        tmp = href.replace(tmp, '');
                        return tmp;
                    }

                    if (href.match(patternAll)) {
                        return href.replace(RegExp.$1, '');
                    }

                    return href;
                }
            };
        };

        return {
            create: _create,

            get: function (key) {
                var href = this.create();
                return href.get(key);
            },

            set: function (key, val) {
                var href = this.create();
                return href.set(key, val);
            },

            del: function (key) {
                var href = this.create();
                return href.del(key);
            }
        }
    }());

    return hrefParameter;
});
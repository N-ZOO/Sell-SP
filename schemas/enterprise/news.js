var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: String,      // 标题
    content: String,    // 内容
    source: String,     // 文章来源
    author: String,     // 作者
    browse: Number,     // 浏览量
    isShow: Boolean,    // 是否显示
    coverImg: String,   // 封面图片
    classify: String,   // 文章类别
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

module.exports = schema;
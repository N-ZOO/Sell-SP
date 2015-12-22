var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    classifyName: String   // 文章类别
});

module.exports = schema;
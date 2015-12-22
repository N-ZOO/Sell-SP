var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true
    },
    password: String,
    meta: {
        ip: String,
        time: Number
    }
});


schema.statics = {
    findOneData: function (obj, cd) {
        return this
            .findOne(obj)
            .exec(cd)
    },
    updateSet: function (conditionsObj,changeObj,callback) {
        callback = callback || new Function();  // 如果没传回调函数,那也要给它置空,不然update无法执行
        return this
            .update(conditionsObj, {$set: changeObj}, callback)
    }
};

module.exports = schema;
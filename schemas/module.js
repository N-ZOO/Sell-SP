var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    icon:String,
    title:String,
    link:String,
    isShow:Boolean,
    orderBy:Number,
    parent:String,
    note:String,
    level:Number,
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

//每次在存储数据之前都会来调用一下这个方法
schema.pre('save', function (next) {
    //数据是否是新添加的
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next();
});


//schema.statics = {
//    modify: function (obj, cd) {
//        return this
//            .findOne(obj)
//            .exec(cd)
//    }
//};

module.exports = schema;


var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    projectName: String,
    describeEn: String,
    describeCn: String,
    link: String,
    image: String,
    orderBy:Number,
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


schema.statics = {
    fetch: function (cd) {
        return this
            .find({})
            .sort({'orderBy':-1})
            .exec(cd)
    },
    findById: function (id, cd) {
        return this
            .findOne({_id: id})
            .exec(cd)
    }
};

module.exports = schema;
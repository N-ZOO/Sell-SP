var mongoose = require('mongoose');
var adminUserSchema = require('../schemas/adminUser');
var adminUser = mongoose.model('user', adminUserSchema);

module.exports = adminUser;

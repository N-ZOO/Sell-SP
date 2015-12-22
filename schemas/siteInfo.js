var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    siteName: String,
    companyName: String,
    domain: String,
    installPath: String,
    managePath: String,
    attachmentPath: String
});

module.exports = schema;


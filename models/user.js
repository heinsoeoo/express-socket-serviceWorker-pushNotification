var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true},
    logged_in: {type: Number, required: true, default: 0, max: 1}
});

module.exports = mongoose.model('User', UserSchema);
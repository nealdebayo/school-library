const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const institution = require('../controllers/institution.controller')

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	role: { type: String, required: true },
    password: { type: String, required: true }
},
{ timestamps: true });

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString(hex);
    return this.hash === hash;
}

UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        role: this.role,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET);
};

UserSchema.methods.linkToInstitution = function(email) {
    let domain = email.split('@')[1];
    return institution.getInstitution(domain);
}

module.exports = mongoose.model('User', UserSchema);
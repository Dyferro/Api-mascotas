//Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const privatePaths = require('mongoose-private-paths');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true,
    },
    pasword: {
        type: String,
        required: true,
        private: true
    },
    role: {
        type: String,
        enum: ['admin', 'employee', 'user'],
        default: user,
    }
});

UserSchema.statics.create = function create(data) {
    return new this(data).save();
}

UserSchema.plugin(privatePaths);
UserSchema.plugin(uniqueValidator, {
    message: '{PATH} Should be unique'
});

module.exports = mongoose.model('User', UserSchema)
const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: false
    },
    isOwner: {
        type: Boolean,
        required: false
    }
});

// UserSchema.methods.validPassword = function (password) {
//     if (password === this.password) {
//       return true; 
//     } else {
//       return false;
//     }
//   }

// UserSchema.plugin(passportLocalMongoose, { usernameField: 'email', passwordField: 'password' });

module.exports = mongoose.model('User', UserSchema)
const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const crypto    = require('crypto');
const jwt       = require('jsonwebtoken');

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        userType : {
            type: String,
            enum: ['Hospital', 'Bank'],
            required: true
        },
        publicKey: {
            type: String,
            required: true
        },
        privateKey: {
            type: String,
            required: true
        },
        hash: {
            type: String
        },
        salt: {
            type: String
        }
    }, {
        timestamps: true
    }
);

User.methods.setPassword = function(password){
    if(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    }
};

User.methods.validPassword = function(password){
    console.log("Password")
    console.log(password);
    console.log(this.salt);
    let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

User.methods.generateJwt = function(){
    let expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    let token = jwt.sign({
        _id: this._id,
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        exp: parseInt(expiry.getTime() / 1000)
    } , process.env.JWT_SECRET);

    return token;
};


module.exports = mongoose.model('User', User);

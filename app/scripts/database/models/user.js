const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        },
    }, ],
});

//generate jwt token when called
userSchema.methods.generateToken = async function() {
    const token = await jwt.sign({ id: this._id }, process.env.JWT_KEY);
    this.tokens.push({ token });
    await this.save();
    return token;
};

//enable hashing of password before user details is saved and while being updated
userSchema.pre('save', async function(exit) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    exit();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
import mongoose, { Mongoose, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const quoteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quote: String, author: String
}, {
    strict: true,
});

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true
        },
        areasOfImprovement: {
            type: [String],
            required: true
        },
        reasonForImprovement: {
            type: [String],
            required: true
        },
        feelingLately: {
            type: String,
            required: true
        },
        notificationNumber: {
            type: Number
        },
        notificationTimeStart: {
            type: Number
        },
        notificationTimeEnd: {
            type: Number
        },
        savedQuotes: [{
            type: Schema.Types.ObjectId,
            ref: "Quote"
        }],
        expoPushToken: {
            type: String
        },
        myQuotes: [
            quoteSchema
        ]
    },
    {
        timestamps: true,
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model('User', userSchema);

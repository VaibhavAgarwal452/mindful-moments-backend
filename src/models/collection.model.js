import mongoose, { Schema } from "mongoose";

const quoteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quote: String,
    author: String,
}, {
    strict: true,
    timestamps: true,
});

const collectionSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    collectionName: {
        type: String,
        required: true,
    },
    quotes: [quoteSchema],
},
    {
        timestamps: true
    })

export const Collection = mongoose.model('Collection', collectionSchema);

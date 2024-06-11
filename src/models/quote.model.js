import mongoose, { Schema } from "mongoose";

const quoteSchema = new Schema({
    quote: {
        type: String
    },
    author: {
        type: String
    },
    category: {
        type: [String]
    },
},
    {
        timestamps: true
    })

export const Quote = mongoose.model('Quote', quoteSchema);

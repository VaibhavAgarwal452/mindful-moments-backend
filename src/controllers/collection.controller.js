import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Collection } from "../models/collection.model.js"
import mongoose from "mongoose";

const createCollection = asyncHandler(async (req, res) => {
    const { userId, collectionName } = req.body

    if (!userId && !collectionName) {
        throw new ApiError(400, "Please provide userID and collection Name")
    }

    const collection = await Collection.create({
        collectionName,
        owner: userId,
    })

    const createCollection = await Collection.find({ _id: collection._id })

    if (!createCollection) {
        throw new ApiError(500, "collection cannot be created")
    }

    return res.status(201).json(new ApiResponse(201, createCollection, "Collection created Successfully"))

})

const updateCollectionName = asyncHandler(async (req, res) => {
    const { collectionId } = req.params
    const { newCollectionName } = req.body
    const currentCollection = await Collection.findOne({ _id: collectionId });

    if (!currentCollection) {
        throw new ApiError(400, "There is no collection with this id")
    }
    const newCollection = await Collection.updateOne({
        _id: collectionId,
    }, {
        $set: {
            collectionName: newCollectionName,
        }
    }, {
        new: true
    })

    const collections = await Collection.find({ owner: new mongoose.Types.ObjectId(currentCollection.owner) })
    return res.status(200).json(new ApiResponse(200, collections, "Collection Name updated Successfully"))
})

const deleteCollection = asyncHandler(async (req, res) => {
    const { collectionId } = req.params
    const newCollection = await Collection.findByIdAndDelete(collectionId)

    if (!newCollection) {
        throw new ApiError(500, "Collection cannot be deleted")
    }

    return res.status(200).json(new ApiResponse(200, newCollection, "Collection deleted Sucessfully"))
})

const getCollection = asyncHandler(async (req, res) => {
    const { userId } = req.params
    if (!userId) {
        throw new ApiError(400, "Please provide userId")
    }
    const collections = await Collection.find({ owner: new mongoose.Types.ObjectId(userId) })
    if (!collections) {
        throw new ApiError(500, "collections cannot be fetched")
    }

    return res.status(200).json(new ApiResponse(200, collections, "Collections fetched successfully"))

})

const addQuotesToCollection = asyncHandler(async (req, res) => {
    const { collectionId, quote, author, quoteId } = req.body

    if (!collectionId && !quote) {
        throw new ApiError(500, "Please provide collectionID and quote")
    }
    const currentQuote = await Collection.find({
        _id: new mongoose.Types.ObjectId(collectionId),
        "quotes._id": new mongoose.Types.ObjectId(quoteId)
    })
    if (currentQuote.length > 0) {
        throw new ApiError(500, "Quote is already there")
    }
    const newQuote = { quote, author, }

    const newCollection = await Collection.updateOne(
        { _id: collectionId },
        {
            $push: { quotes: { ...newQuote, _id: quoteId } }
        }
    )
    if (!newCollection) {
        throw new ApiError(400, "Quotes cannot be saved")
    }
    const currentCollection = await Collection.findById(collectionId)

    return res.status(200).json(new ApiResponse(200, currentCollection, "Quote Added to collection Successfully"))
})

const removeQuotesFromCollection = asyncHandler(async (req, res) => {
    const { collectionId, quoteId } = req.body
    if (!collectionId && !quoteId) {
        throw new ApiError(500, "Please provide collectionID and quoteId")
    }
    const currentQuote = await Collection.find({
        _id: new mongoose.Types.ObjectId(collectionId),
        "quotes._id": new mongoose.Types.ObjectId(quoteId)
    })

    if (currentQuote.length === 0) {
        throw new ApiError(400, "The quote is not in collection")
    }

    const newCollection = await Collection.updateOne({
        _id: collectionId,
    }, {
        $pull: { quotes: { _id: new mongoose.Types.ObjectId(quoteId) } }
    })

    if (!newCollection) {
        throw new ApiError(500, "Quote Cannot be removed")
    }

    const currentCollection = await Collection.findById(collectionId)

    return res.status(200).json(new ApiResponse(200, currentCollection, "Quote Removed from collection"))
})

export { createCollection, updateCollectionName, deleteCollection, getCollection, addQuotesToCollection, removeQuotesFromCollection }
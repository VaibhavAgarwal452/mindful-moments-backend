import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, gender, areasOfImprovement, reasonForImprovement, feelingLately } = req.body

    if ([name, email, password, gender].some(field => field.trim() === "")) {
        throw new ApiError(400, "All fields are Required")
    }

    const existedUser = await User.findOne({
        $or: [{ name }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        name,
        email,
        password,
        gender,
        areasOfImprovement,
        reasonForImprovement,
        feelingLately
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name && !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{ email }, { name }]
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    // const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser
                },
                "User logged In Successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const addToSavedQuotes = asyncHandler(async (req, res) => {
    const { quoteId, userId } = req.params

    if (!quoteId && !userId) {
        throw new ApiError(400, "Please provide the QuoteId and UserID")
    }

    const quote = await User.find({
        _id: new mongoose.Types.ObjectId(userId),
        savedQuotes: {
            $in: new mongoose.Types.ObjectId(quoteId)
        }
    })
    if (quote?.length > 0) {
        throw new ApiError(402, "This quote is already in saved Quotes")
    }
    const user = await User.updateOne(
        { _id: userId },
        {
            $push: { savedQuotes: new mongoose.Types.ObjectId(quoteId) }
        }
    )
    if (!user) {
        throw new ApiError(400, "Quotes cannot be saved")
    }
    return res.status(200).json(new ApiResponse(200, user, "Quotes added to saved Quotes"));


})

const removeFromSavedQuotes = asyncHandler(async (req, res) => {
    const { quoteId, userId } = req.params

    if (!quoteId && !userId) {
        throw new ApiError(400, "Please provide the QuoteId and UserID")
    }

    const quote = await User.find({
        _id: new mongoose.Types.ObjectId(userId),
        savedQuotes: {
            $in: new mongoose.Types.ObjectId(quoteId)
        }
    })
    if (quote?.length === 0) {
        throw new ApiError(400, "This quote is not in saved Quotes")
    }
    const user = await User.updateOne(
        { _id: userId },
        {
            $pull: { savedQuotes: new mongoose.Types.ObjectId(quoteId) }
        }
    )
    if (!user) {
        throw new ApiError(400, "Quotes cannot be removed")
    }
    return res.status(200).json(new ApiResponse(200, user, "Quotes removed from saved Quotes"));


})

const getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        throw new ApiError(400, "Please provide the userId")
    }
    const user = await User.findById(userId)
    if (!user) {
        throw new ApiError(500, "User cannot be fetched")
    }

    return res.status(200).json(new ApiResponse(200, user, "User fetched Successfully"))
})

export { registerUser, loginUser, getUserById, logoutUser, addToSavedQuotes, removeFromSavedQuotes }
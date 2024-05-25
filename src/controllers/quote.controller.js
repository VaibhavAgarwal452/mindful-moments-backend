import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Quote } from "../models/quote.model.js"

const getQuotes = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.body;
    const quotesCount = await Quote.countDocuments();
    const totalPages = Math.ceil(quotesCount / limit);

    // Fetch random quotes with pagination
    const quotes = await Quote.aggregate([
        { $sample: { size: parseInt(limit) } },
        { $skip: (page - 1) * limit },
        // { $limit: parseInst(limit) }
    ]);

    res.json({
        quotes,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages
    });

})


const getQuotesById = asyncHandler(async (req, res) => {
    const { ids } = req.body
    if (ids.length === 0) {
        throw new ApiError(400, "Please provide the apiIds")
    }

    const quotes = await Quote.find({ _id: { $in: ids } })
    console.log(quotes, "quotes")
    if (!quotes) {
        console.log(error, "error")
        throw new ApiError(500, "something went wrong")
    }
    return res.status(200).json(new ApiResponse(200, quotes, "Quotes Fetched Successfully"))
})

export { getQuotes, getQuotesById }
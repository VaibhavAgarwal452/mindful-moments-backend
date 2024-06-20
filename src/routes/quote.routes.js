import { Router } from "express";
import { getQuotes, getQuotesById, getQuotesByCategory } from "../controllers/quote.controller.js";
const router = Router()

router.route("/random").post(getQuotes)
router.route("/quote/getQuotesById").post(getQuotesById)
router.route("/getQuotesByCategory").post(getQuotesByCategory)

export default router;
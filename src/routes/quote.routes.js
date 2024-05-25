import { Router } from "express";
import { getQuotes, getQuotesById } from "../controllers/quote.controller.js";
const router = Router()

router.route("/random").post(getQuotes)
router.route("/quote/getQuotesById").post(getQuotesById)

export default router;
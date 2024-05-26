import { Router } from "express";
import { createCollection, deleteCollection, updateCollectionName, getCollection, addQuotesToCollection, removeQuotesFromCollection } from "../controllers/collection.controller.js";
const router = Router()

router.route("/create").post(createCollection)
router.route("/updateName/:collectionId").patch(updateCollectionName).delete(deleteCollection)
router.route("/getCollection/:userId").get(getCollection)
router.route("/addQuoteToCollection").patch(addQuotesToCollection)
router.route("/removeQuotesFromCollection").patch(removeQuotesFromCollection)

export default router;


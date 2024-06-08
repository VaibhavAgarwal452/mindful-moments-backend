import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser, loginUser, logoutUser, getUserById, addToSavedQuotes, removeFromSavedQuotes, addToMyQuotes, removeFromMyQuotes, updateMyQuotes, checkIfUserEmailExists } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/checkEmail").post(checkIfUserEmailExists)
router.route("/user/:userId").get(getUserById)
router.route("/:userId/addQuote/:quoteId").patch(addToSavedQuotes)
router.route("/:userId/removeQuote/:quoteId").patch(removeFromSavedQuotes)
router.route("/:userId/addToMyQuotes").post(addToMyQuotes)
router.route("/:userId/removeFromMyQuotes/:quoteId").patch(removeFromMyQuotes)
router.route("/:userId/updateMyQuotes").post(updateMyQuotes)

// router.route("/logout").post(verifyJWT, logoutUser)

export default router;
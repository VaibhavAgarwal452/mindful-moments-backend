import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser, loginUser, logoutUser, getUserById, addToSavedQuotes, removeFromSavedQuotes } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/user/:userId").get(getUserById)
router.route("/:userId/addQuote/:quoteId").patch(addToSavedQuotes)
router.route("/:userId/removeQuote/:quoteId").patch(removeFromSavedQuotes)

// router.route("/logout").post(verifyJWT, logoutUser)

export default router;
import { Router } from "express";
import { registerUser, loginUser, sendNotification, logoutUser, updateUser, getUserById, addToSavedQuotes, removeFromSavedQuotes, addToMyQuotes, removeFromMyQuotes, updateMyQuotes, checkIfUserEmailExists, sendNotificationFromDatabase } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/checkEmail").post(checkIfUserEmailExists)
router.route("/user/:userId").get(getUserById)
router.route("/updateUser/:userId").patch(updateUser)
router.route("/:userId/addQuote/:quoteId").patch(addToSavedQuotes)
router.route("/:userId/removeQuote/:quoteId").patch(removeFromSavedQuotes)
router.route("/:userId/addToMyQuotes").post(addToMyQuotes)
router.route("/:userId/removeFromMyQuotes/:quoteId").patch(removeFromMyQuotes)
router.route("/:userId/updateMyQuotes").post(updateMyQuotes)
// router.route("/saveToken").post(saveTokenToFirebase)
router.route("/sendNotification").post(sendNotification)
router.route("/sendNotificationFromDatabase").get(sendNotificationFromDatabase)


// router.route("/logout").post(verifyJWT, logoutUser)

export default router;
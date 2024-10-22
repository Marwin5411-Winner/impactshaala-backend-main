import express from "express";
const router = express();

// middleware to check is user authenticated or not
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";

import reportUser from "../../controllers/chats/report-user.js";
import blockUser from "../../controllers/chats/block-user.js";
import unblockUser from "../../controllers/chats/unblock-user.js";
import sendMessage from "../../controllers/chats/send-message.js";
// import updateOnlineStatus from "../../controllers/chats/update-online-profile.js"

router.post('/report-user/:recipientId',isUserAuthenticated,reportUser);
router.post('/block-user/:recipientId',isUserAuthenticated,blockUser);
router.post('/unblock-user/:recipientId',isUserAuthenticated,unblockUser);
router.post('/send-message', isUserAuthenticated, sendMessage)
// router.get('/update-online-status',isUserAuthenticated,updateOnlineStatus);

export default router;
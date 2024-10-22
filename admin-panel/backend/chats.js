import express from "express";
import viewReportedUsers from "./user-and-chats-controllers/view-reported-users.js";
import downloadedReportedChats from "./user-and-chats-controllers/downloaded-reported-chats.js";
import checkIsUserLoggedIn from "./admin-middleware/check-is-user-logged-in.js";

const router = express.Router();

router.get('/view-reported-user',checkIsUserLoggedIn,viewReportedUsers);
router.post('/download-reported-chats',checkIsUserLoggedIn,downloadedReportedChats);

export default router;
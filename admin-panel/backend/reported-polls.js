import express from 'express';
import checkIsUserLoggedIn from "../backend/admin-middleware/check-is-user-logged-in.js";
import listAllReportedPolls from './reported-polls-controller/reported-polls.js';

const router = express.Router()

router.get("/list-all-reported-polls", checkIsUserLoggedIn, listAllReportedPolls)

export default router;
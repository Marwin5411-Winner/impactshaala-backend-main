import express from 'express';
import checkIsUserLoggedIn from "../backend/admin-middleware/check-is-user-logged-in.js";
import listAllPolls from './polls-controllers/list-all-polls.js';
import deletePoll from './polls-controllers/delete-poll.js';
import viewPoll from './polls-controllers/view-poll.js';

const router = express.Router()

router.get("/list-all-polls", checkIsUserLoggedIn, listAllPolls)
router.delete("/delete/:id", checkIsUserLoggedIn, deletePoll )
router.get('/view-poll/:id', checkIsUserLoggedIn, viewPoll)

export default router;
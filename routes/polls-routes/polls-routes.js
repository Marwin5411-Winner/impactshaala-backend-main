import express from "express";

const router = express();

// middleware to check is user authenticated or not
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";
import createPoll from "../../controllers/polls/create-polls.js";
import updatePoll from "../../controllers/polls/update-poll.js";
import listProfileById from  "../../controllers/polls/list-profile-by-id.js";
import getRelatedPolls from "../../controllers/polls/get-related-polls.js";

import likePoll from "../../controllers/polls/like-poll-by-poll-id.js";
import unLikePoll from "../../controllers/polls/unlike-poll-by-poll-id.js";
import reportPolls from "../../controllers/polls/report-polls-by-poll-id.js";

import commentOnPoll from "../../controllers/polls/comment-on-poll.js";
import deleteCommentsOnPolls from "../../controllers/polls/delete-comment-poll-id.js";

import listMyPolls from "../../controllers/polls/list-my-polls.js";
import deletePoll from "../../controllers/polls/delete-poll.js";
import savePoll from "../../controllers/polls/save-poll.js";
import unsavePoll from "../../controllers/polls/unsave-poll.js";
import voteOnPoll from "../../controllers/polls/vote-on-poll.js";

router.post('/create',isUserAuthenticated,createPoll);
router.put("/update/:id", isUserAuthenticated, updatePoll);
router.delete("/delete/:id", isUserAuthenticated, deletePoll);
router.get('/list-profile-polls/:id',isUserAuthenticated,listProfileById);
router.get('/get-related',isUserAuthenticated,getRelatedPolls);

router.get('/like/:id',isUserAuthenticated,likePoll);
router.get('/unlike/:id',isUserAuthenticated,unLikePoll);
router.post('/report/:id',isUserAuthenticated,reportPolls);

router.post('/comment/:id',isUserAuthenticated,commentOnPoll);
router.delete('/delete-comment',isUserAuthenticated,deleteCommentsOnPolls);

router.get('/list-my-polls',isUserAuthenticated,listMyPolls);
router.get('/save/:id', isUserAuthenticated, savePoll);
router.get('/unsave/:id', isUserAuthenticated, unsavePoll);
router.post('/vote/:id', isUserAuthenticated, voteOnPoll);

export default router;
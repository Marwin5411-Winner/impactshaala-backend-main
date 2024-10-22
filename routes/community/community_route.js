import express from "express";
import acceptFriendRequest from "../../controllers/Community/accept_friend_requests.js";
import sendFriendRequest from "../../controllers/Community/send_friend_requests.js";
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";
import getReceivedFriendRequests from "../../controllers/Community/get_friend_requests.js";
import getCommunity from "../../controllers/Community/getCommunity.js";


const router = express();

router.post("/send-friend-request", isUserAuthenticated, sendFriendRequest);
router.post("/accept-friend-request", isUserAuthenticated, acceptFriendRequest);
// GET: Get received friend requests
router.get(
  "/received-friend-requests",
  isUserAuthenticated,
  getReceivedFriendRequests
);

router.get('/members', isUserAuthenticated, getCommunity)

export default router;

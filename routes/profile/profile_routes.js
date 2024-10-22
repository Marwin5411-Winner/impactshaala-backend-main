import express from "express";

const router = express();

import getUserProfile from "../../controllers/profile/get-profile.js";
import updateProfile from "../../controllers/profile/update-profile.js";
import searchProfile from "../../controllers/profile/search-profile.js";
import searchProfileById from "../../controllers/profile/search-profile-by-id.js";

// middleware to check is user authenticated or not
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";

router.get('/get-profile',isUserAuthenticated,getUserProfile);
router.put('/update-profile',isUserAuthenticated,updateProfile);
router.get('/search',isUserAuthenticated,searchProfile);
router.get('/get-profile/:id',isUserAuthenticated,searchProfileById);

export default router;
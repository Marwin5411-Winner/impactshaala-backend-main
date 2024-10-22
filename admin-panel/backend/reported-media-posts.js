import express from 'express';
import checkIsUserLoggedIn from "../backend/admin-middleware/check-is-user-logged-in.js";
import listAllReportedMediaPosts from './reported-media-posts-controller/list-all-reported-media-posts.js';

const router = express.Router()

router.get("/list-all-reported-media-posts", checkIsUserLoggedIn, listAllReportedMediaPosts)

export default router;
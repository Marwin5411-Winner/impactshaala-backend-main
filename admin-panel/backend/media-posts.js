import express from 'express';
import checkIsUserLoggedIn from "../backend/admin-middleware/check-is-user-logged-in.js";
import listAllMediaPosts from './media-posts-controllers/list-all-media-posts.js';
import deleteMediaPost from './media-posts-controllers/delete-media-post.js';
import viewMediaPost from './media-posts-controllers/view-media-post.js';


const router = express.Router()

router.get("/list-all-media-posts", checkIsUserLoggedIn, listAllMediaPosts)
router.delete("/delete/:id", checkIsUserLoggedIn, deleteMediaPost)
router.get("/view-media-post/:id", checkIsUserLoggedIn, viewMediaPost)

export default router;
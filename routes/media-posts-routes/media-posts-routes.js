import express from "express";

const router = express();

// middleware to check is user authenticated or not
import isUserAuthenticated from "../../middlewares/is-user-authenticated.js";

import createPost from "../../controllers/media-posts/create-post.js";
import updatePostById from "../../controllers/media-posts/update-post-by-post-id.js";
import listMyPost from "../../controllers/media-posts/list-my-posts.js";
import deleteMyPost from "../../controllers/media-posts/delete-post-by-post-id.js";
import getRelatedPost from "../../controllers/media-posts/get-related-posts.js";
import likeAPost from "../../controllers/media-posts/like-media-post.js";
import unLikeAPost from "../../controllers/media-posts/unlike-media-post.js";
import commentPost from "../../controllers/media-posts/comment-a-post.js";
import getPostListsBasedOnProfileId from "../../controllers/media-posts/list-posts-by-profile-id.js";
import reportPost from "../../controllers/media-posts/report-post-by-post-id.js";
import deleteComments from "../../controllers/media-posts/delete-comments-post-id.js";
import savePost from "../../controllers/media-posts/save-post.js";
import unsavePost from "../../controllers/media-posts/unsave-post.js";
import getSavedPosts from "../../controllers/media-posts/get-savedPost.js";
import getMediaPost from "../../controllers/media-posts/get-media-post.js";
import getPinnedPosts from "../../controllers/media-posts/get-pinned-post.js";
import pinPost from "../../controllers/media-posts/pinned-post.js";
import unpinPost from "../../controllers/media-posts/unpinned-post.js";


router.post('/create',isUserAuthenticated,createPost);
router.put('/update/:postId',isUserAuthenticated,updatePostById);
router.get('/list-my-posts',isUserAuthenticated,listMyPost);
router.get('/get-media-post/:id', isUserAuthenticated, getMediaPost);
router.delete('/delete-my-post/:postId',isUserAuthenticated,deleteMyPost);

router.get('/get-related',isUserAuthenticated,getRelatedPost);
router.post('/like/:id',isUserAuthenticated,likeAPost);
router.post('/unlike/:id',isUserAuthenticated,unLikeAPost);

router.post('/comment/:id',isUserAuthenticated,commentPost);
router.delete('/delete-comment',isUserAuthenticated,deleteComments);

router.get('/list-profile-posts/:id',isUserAuthenticated,getPostListsBasedOnProfileId);
router.post('/report/:id',isUserAuthenticated,reportPost);

router.get('/save/:id', isUserAuthenticated, savePost);
router.get('/unsave/:id', isUserAuthenticated, unsavePost);
router.get('/get-savedpost', isUserAuthenticated, getSavedPosts);

router.get('/pinned-post', isUserAuthenticated, getPinnedPosts);
router.post('/pinned-post/pin', isUserAuthenticated, pinPost);
router.post('/pinned-post/unpin', isUserAuthenticated, unpinPost);


export default router;
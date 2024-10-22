import MediaPosts from "../../../models/media_posts/media-posts.js";

const viewMediaPost = async (req, res, next) => {
	try {
		const mediaPost = await MediaPosts.findOne({_id: req.params.id})
			.populate({path: "userId", populate: {path: "authId"}})
			.populate({path: "likes", select: "name profilePic _id"})
			.populate({path: "comments", populate: {path: "writer", select: "name profilePic _id"}})
			.lean()
		return res.render("media-posts/view-media-post", {currentPage: "media-posts", post: mediaPost, userData: mediaPost.userId});
	}	catch(err) {
		return res.status(500).send({success:false});
	}
}

export default viewMediaPost;
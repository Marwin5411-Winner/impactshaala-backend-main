import MediaPosts from "../../../models/media_posts/media-posts.js";

const listAllMediaPosts = async (req, res, next) => {
	try {
		const allMediaPosts = await MediaPosts.find().populate("userId").lean()
		return res.render("media-posts/list-all-media-posts", {currentPage: "media-posts", posts: allMediaPosts});
	}	catch(err) {
		return res.status(500).send({success:false});
	}
}

export default listAllMediaPosts;
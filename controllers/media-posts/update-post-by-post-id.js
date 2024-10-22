import MediaPosts from "../../models/media_posts/media-posts.js";
import User from "../../models/user/user.js";

async function updatePostById(req, res, next) {
    try {
        const userId = req.user.id;
        const { postId } = req.params;
        const { description } = req.body;

        const user = await User.findOne({ authId: userId });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
  
        const updatedPost = await MediaPosts.findOneAndUpdate(
            { _id: postId, userId: user._id }, 
            { description: description }, 
            { new: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ success: false, message: "No posts were posted by you or you haven't posted yet." });
        }

        return res.status(200).json({ success: true, message: "Updated Post Successfully", data: updatedPost });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export default updatePostById;

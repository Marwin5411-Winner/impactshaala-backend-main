import MediaPosts from "../../models/media_posts/media-posts.js";
import User from "../../models/user/user.js";

async function unLikeAPost(req, res, next) {
    const userId = req.user.id; // The authenticated user's ID from the middleware
    const { reactionType } = req.body; // The type of reaction to remove

    try {
        const { id } = req.params; // The media post ID from request params
        const profile = await User.findOne({ authId: userId });

        if (!profile) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let mediaPost = await MediaPosts.findById(id);

        if (!mediaPost) {
            return res.status(404).json({ success: false, message: "Couldn't fetch the media post" });
        }

        // Find the reaction of this user in the mediaPost reactions array
        const reactionIndex = mediaPost.reactions.findIndex(
            (reaction) => reaction.user.toString() === profile._id.toString() && reaction.type === reactionType
        );

        if (reactionIndex === -1) {
            return res.status(400).json({ success: false, message: "You have not reacted with this type on this post." });
        }

        // Remove the user's reaction from the post
        mediaPost.reactions.splice(reactionIndex, 1); // Remove the reaction at the found index

        // Save the updated media post
        await mediaPost.save();

        return res.status(200).json({ success: true, message: `Your '${reactionType}' reaction has been removed from this post.` });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export default unLikeAPost;

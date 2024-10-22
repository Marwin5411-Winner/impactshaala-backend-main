import MediaPosts from "../../models/media_posts/media-posts.js";
import User from "../../models/user/user.js";

async function likeAPost(req, res, next) {
  const userId = req.user.id; // The authenticated user's ID from middleware
  const { reactionType } = req.body; // Extract reactionType from request body
  console.log(reactionType);

  try {
    const { id } = req.params; // Media post ID from request params
    const profile = await User.findOne({ authId: userId });

    if (!profile) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let mediaPost = await MediaPosts.findById(id);

    if (!mediaPost) {
      return res.status(404).json({ success: false, message: "Couldn't fetch the media post" });
    }

    // Check if the user has already reacted to this post
    const existingReactionIndex = mediaPost.reactions.findIndex(
      (reaction) => reaction.user.toString() === profile._id.toString()
    );

    if (existingReactionIndex !== -1) {
      // User has already reacted, check if the reactionType is the same
      if (mediaPost.reactions[existingReactionIndex].type === reactionType) {
        return res.status(400).json({ success: false, message: "You have already reacted with this type" });
      }
      
      // If different reaction, update the reaction
      mediaPost.reactions[existingReactionIndex].type = reactionType;
    } else {
      // If the user has not reacted, push a new reaction
      mediaPost.reactions.push({
        user: profile._id, // Store the user ID
        type: reactionType, // Store the reaction type (Like, Love, etc.)
      });
    }

    // Save the updated media post with the new reaction
    await mediaPost.save();
    return res.status(200).json({ success: true, message: "Reaction updated successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

export default likeAPost;

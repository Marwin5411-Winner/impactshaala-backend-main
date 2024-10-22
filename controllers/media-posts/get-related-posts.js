import { populate } from "dotenv";
import MediaPosts from "../../models/media_posts/media-posts.js";
import User from "../../models/user/user.js";

async function getRelatedPost(req, res, next) {
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try {
        const profile = await User.findOne({ authId: userId }).populate({ path: 'collabKeywords', select: 'collabTag' });

        if (!profile) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Extract collabTags from the user's profile
        const userCollabTags = profile.collabKeywords.map(keyword => keyword.collabTag);

        const relatedPosts = [];

        const mediaPosts = await MediaPosts.find().populate({ path: 'userId', populate: { path: 'collabKeywords', select: 'collabTag' } })
                            .populate({path:'comments',populate:{path:'writer',select:'name profilePic'}});

        for (const post of mediaPosts) {
            const postCollabTags = post.userId.collabKeywords.map(keyword => keyword.collabTag);
            // Check if any of the post's collabTags match with the user's collabTags
            const intersection = userCollabTags.filter(tag => postCollabTags.includes(tag));
            if (intersection.length > 0) {
                // if the there is no image don't send these posts.
                if(post.image.length>0){
                    relatedPosts.push(post);
                }
            }
        }

        return res.status(200).json({ success: true, data: relatedPosts.reverse() });

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export default getRelatedPost;

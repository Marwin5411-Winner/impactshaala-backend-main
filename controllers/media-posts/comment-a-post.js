import MediaPosts from "../../models/media_posts/media-posts.js"
import User from "../../models/user/user.js";
import Comment from '../../models/comments/comments.js';

async function commentPost(req, res, next) {
    try {
        const userId = req.user.id;
        const { id } = req.params;
        const { text } = req.body;

        

        // Validate request body
        if (!text) {
            return res.status(400).json({ success: false, message: "Please provide a comment text." });
        }

        // Find user profile
        const profile = await User.findOne({ authId: userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find media post
        let mediaPost = await MediaPosts.findById(id);
        if (!mediaPost) {
            return res.status(404).json({ success: false, message: "Couldn't fetch the media post" });
        }

        let comment = await Comment({text, writer: profile._id})
        const savedComment = await comment.save()


        // Push comment to media post
        mediaPost.comments.push(savedComment._id);
        console.log(`Profile : ${profile._id}`);
        await mediaPost.save();

        // Fetch the media post again with populated comments
        mediaPost = await MediaPosts.findById(id).populate({ path: 'comments', populate: { path: 'writer',select:'name profilePic'} });

        return res.status(200).json({ success: true, message: "You have commented on this post.", data: mediaPost });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export default commentPost;
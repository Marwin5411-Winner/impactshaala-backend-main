import MediaPosts from "../../models/media_posts/media-posts.js"
import User from "../../models/user/user.js";
import Comment from '../../models/comments/comments.js';

async function deleteComments(req, res, next) {
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try {
        const userProfile = await User.findOne({ authId: userId });

        const { postId, commentId } = req.query;

        if (!userProfile) {
            return res.status(404).json({ success: false, message: "Can't not find the user" });
        }
        const comment = await Comment.findOne({_id: commentId})
        if(comment.writer.toString() !== userProfile._id.toString())
            return res.status(500).json({success: false, message: "You cannot delete others' comments"})

        const resp = await Comment.findOneAndDelete({_id: commentId, writer: userProfile._id.toString()}, {new: true})
        if(!resp) return res.status(401).json({success: false, message: "There was some error while deleting the comment"})

        const resp2 = await MediaPosts.updateOne({_id: postId}, {$pull: {comments: commentId}})
        if(!resp2) return res.status(401).json({success: false, message: "There was some error while deleting the comment"})

        return res.json({success: true, message: "Comment deleted successfully!!"})

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export default deleteComments;

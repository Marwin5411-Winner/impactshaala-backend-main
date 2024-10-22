import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";
import Comment from '../../models/comments/comments.js';

async function deleteCommentsOnPolls(req, res, next) {
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try {
        const userProfile = await User.findOne({ authId: userId });

        const { pollId, commentId } = req.query;

        if (!userProfile) {
            return res.status(404).json({ success: false, message: "Can't not find the user" });
        }

        let polls = await Polls.findById(pollId).populate({ path: 'comments', populate: { path: 'writer', select: 'name profilePic' } });

        if (!polls) {
            return res.status(404).json({ success: false, message: "Couldn't fetch the poll" });
        }

        const resp = await Comment.findOneAndDelete({_id: commentId, writer: userProfile._id})
        if(!resp) return res.status(500).json({success: false, message: "There was some error in deleting the comment"})

        const resp2 = await Polls.updateOne({_id: pollId}, {$pull: {comments: commentId}})
        if(!resp2) return res.status(500).json({success: false, message: "There was some error in deleting the comment"})

        return res.json({success: true, message: "Comment deleted successfully!!"})

    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export default deleteCommentsOnPolls;

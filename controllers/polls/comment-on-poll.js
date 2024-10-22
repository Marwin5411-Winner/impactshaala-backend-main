import Polls from "../../models/polls/polls.js";
import User from "../../models/user/user.js";
import Comment from '../../models/comments/comments.js';
import createNotification from "../../utils/notification/sendGeneralNotification.js";
import Authentication from "../../models/auth/authenication.js";

async function commentOnPoll(req, res, next) {
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
        let polls = await Polls.findById(id);
        if (!polls) {
            return res.status(404).json({ success: false, message: "Couldn't fetch the poll you are looking for." });
        }

        // Push comment to media post
        const comment = await Comment({text, writer: profile._id})
        const savedComment = await comment.save()
        polls.comments.push(savedComment._id)
        await polls.save();

        // Fetch the media post again with populated comments
        polls = await Polls.findById(id).populate({ path: 'comments', populate: { path: 'writer',select:'name profilePic'} });

        let user = await User.findById(polls.userId);

        let auth = await Authentication.findById(user.authId)

         //Notification
	  await createNotification(polls.userId, "Someone is Comment on your Poll Question", "COMMENT");

	  await sendNotificationEmail({
		email: auth.email,
		userName: user.name,
		notificationType: "COMMENT",
		notificationMessage: "Someone has comment on your poll",
		actionLink: "https://impactshaala.com/",
	  });

        return res.status(200).json({ success: true, message: "You have commented on this poll.", data: polls });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}


export default commentOnPoll;
import Poll from '../../../models/polls/polls.js';
import Comment from '../../../models/comments/comments.js';

const deletePoll = async (req, res) => {
	try {
		const poll = await Poll.findOne({_id: req.params.id})
		await Comment.deleteMany({_id: {$in: poll.comments}})
		const deletedPoll = await Poll.findOneAndDelete({_id: req.params.id})
		if(deletedPoll)
			res.status(200).send({success: true, message: "Deleted Poll Successfully"})
	} catch(err) {
		res.status(500).json({success: false, message: "Error deleting poll: " + err.message})
	}
}

export default deletePoll;
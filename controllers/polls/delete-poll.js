import Poll from '../../models/polls/polls.js';
import User from '../../models/user/user.js';

const deletePoll = async (req, res, next) => {
	const userId = req.user.id
	const pollId = req.params.id

	try {
		// Check if the user exists
		const user = await User.findOne({authId: userId}).lean()
		if(!user) return res.status(401).json({success: false, message: "User not found"})
			
			// Check if poll exists
		const poll = await Poll.findOne({_id: pollId}).lean()
		if(!poll) return res.status(400).json({success: false, message: "Poll not found"})
		
		// Check if the user is the owner of the poll
		console.log("Poll: ", poll)
		console.log("User id: ", userId)
		if(poll.userId.toString() !== user._id.toString()) return res.status(401).json({success: false, message: "User is not authorised to delete the poll"})

		const deletedPoll = await Poll.findOneAndDelete({_id: pollId})
		if(!deletedPoll) return res.status(500).json({success: false, message: "There was some error while deleteing the poll"})
		return res.json({success: true, message: "Poll Successfully Deleted!!"})
	} catch(err) {
		console.log(err)
		return res.status(500).json({success: false, message: err.message})
	}
}

export default deletePoll
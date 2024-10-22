import Poll from '../../../models/polls/polls.js';
import User from '../../../models/user/user.js';

const viewPoll = async (req, res) => {

	try {
		const poll = await Poll.findOne({_id: req.params.id})
		if(!poll) return res.status(400).json({success: false, message: "Poll not found"})

		const user = await User.findOne({_id: poll.userId}).populate("authId")
		if(!user) res.status(400).json({success: false, message: "The user no longer exists"})

		return res.render("polls/view-poll", {currentPage: "polls", poll: poll, userData: user})
	} catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: "Something went wrong!!"})
	}
}

export default viewPoll
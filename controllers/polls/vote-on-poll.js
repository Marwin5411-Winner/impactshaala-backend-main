import User from '../../models/user/user.js'
import Poll from '../../models/polls/polls.js';

const voteOnPoll = async (req, res) => {	
	const authId = req.user.id;
	try {
		const user = await User.findOne({authId}).lean()
		if(!user) return res.status(401).json({success: false, message: "User not found"})
		
		const pollId = req.params.id
		const poll = await Poll.findOne({_id: pollId})
		if(!poll) return res.status(400).json({success: false, message: "Poll not found"})

		let allVotes = []
		poll.options.forEach(item => allVotes.push(...item.votes.map((item) => item.toString())))

		console.log("Votes: ", allVotes)

		if(allVotes.includes(user._id.toString())) return res.status(400).json({success: false, message: "You have already voted"})

		const optionId = req.body.optionId
		const optionIndex = poll.options.findIndex(item => item._id.toString() === optionId)

		if(optionIndex === -1) return res.status(400).json({success: false, message: "Option not found"})

		poll.options[optionIndex].votes.push(user._id)
		const response = await poll.save()
		if(!response) return res.status(500).json({success: false, message: "Error while voting"})
		return res.json({success: true, message: "Voting Successful!!", data: response})

	} catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: err.message})
	}
}

export default voteOnPoll;
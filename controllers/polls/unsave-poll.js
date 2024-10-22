import User from '../../models/user/user.js';

const unsavePoll = async (req, res, next) => {
	const authId = req.user.id
	try {

		// Check if the user exists
		const user = await User.findOne({authId}).lean()
		if(!user) return res.status(401).json({success: false, message: "User does not exist"})

		// Check if the poll does not exist in the saved media posts list
		const pollId = req.params.id
		if(!user.savedPolls || !user.savedPolls.map(item => item.toString()).includes(pollId)) return res.status(400).json({success: false, message: "Poll is not saved"})

		const response = await User.findOneAndUpdate({_id: user._id}, {$pull: {savedPolls: pollId}})

		if(!response) return res.status(500).json({success: false, message: "There was some error while removing the poll"})
		res.json({success: true, message: "Successfully unsaved the poll"})
	}
	catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: err.message})
	}
}

export default unsavePoll;
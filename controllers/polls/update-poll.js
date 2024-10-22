import Poll from '../../models/polls/polls.js';
import User from '../../models/user/user.js';
import { pollsDuration } from '../../consts/userenums.js';
import mongoose from 'mongoose';

function addDays(date, days) {
	const newDate = new Date(date);
	newDate.setDate(date.getDate() + days);
	return newDate;
}

const updatePoll = async (req, res, next) => {
	const userId = req.user.id
	const {id} = req.params

	try {
		const profile = await User.findOne({authId: userId})
		if(!profile) return res.status(401).json({success: false, message: "User not found"})

		let update = req.body
		
		// Removing the fields that dont have falsy values
		Object.keys(update).forEach(key => {
			if(!update[key]) delete update[key]
		})

		// Check if the poll exists
		const poll = await Poll.findOne({_id: id})
		if(!poll) return res.status(400).json({success: false, message: "Poll not found"})

		// Check if the user is actually the owner of the poll
		if(poll.userId.toString() !== profile._id.toString()) return res.status(401).json({success: false, message: "You are not authorised to edit this poll"})

		if(update.duration) {
			let pollDuration
			let duration = update.duration
			const createdAt = poll.createdAt
			if(duration===pollsDuration.duration[0]){
				pollDuration = addDays(createdAt, 1);
			}else if(duration===pollsDuration.duration[1]){
				pollDuration = addDays(createdAt, 3);
			}else if(duration===pollsDuration.duration[2]){
				pollDuration = addDays(createdAt, 7);
			}else{
				pollDuration = addDays(createdAt, 14);
			}	
			update.duration = pollDuration
		}

		update.options = update.text ? update.text.map(option => ({text: option})): []
		if(update.keywords) update.keywords = update.keywords.map(keyword => (new mongoose.Types.ObjectId(keyword)))

		const updatedPoll = await Poll.findOneAndUpdate({_id: id}, update)
		if(!updatedPoll) return res.status(500).json({success: false, message: "Error while updating the poll"})
		return res.json({success: true, message: "Poll successfully updated"})
	} catch(err) {
		console.log(err)
		return res.status(500).json({success: false, message: err.message})
	}
}

export default updatePoll
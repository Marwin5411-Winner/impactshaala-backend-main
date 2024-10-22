import Polls from '../../../models/polls/polls.js';

const listAllPolls = async (req, res, next) => {
	try {
		const allPolls = await Polls.find().populate({path: "userId"}).populate({path: "keywords"}).lean()
		res.render("polls/list-all-polls", {currentPage: "polls", polls: allPolls.filter((poll) => !!poll.userId)});
	} catch(err) {
		res.status(500).json({success: false, message: "Something went wrong"})
	}
}

export default listAllPolls
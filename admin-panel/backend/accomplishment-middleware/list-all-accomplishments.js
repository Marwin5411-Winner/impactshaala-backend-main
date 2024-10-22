import Accomplishment from '../../../models/accomplishments/accomplishments.js';

const listAllAccomplishments = async (req, res) => {
	try {
		const accomplishments = await Accomplishment.find().populate({path: "userId", populate: {path: "authId"}}).lean()
		res.render("accomplishment/list-all-accomplishments", {currentPage: "accomplishments", accomplishments: accomplishments.filter((acc) => !!acc.userId)});
	} catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: "Something went wrong"})
	}
}

export default listAllAccomplishments;
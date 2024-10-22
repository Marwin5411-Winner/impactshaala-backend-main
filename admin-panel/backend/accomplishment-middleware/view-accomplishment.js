import Accomplishment from '../../../models/accomplishments/accomplishments.js';

const viewAccomplishment = async (req, res) => {
	const {id} = req.params
	try {
		const accomplishment = await Accomplishment.findOne({_id: id}).populate({path: "userId", populate: {path: "authId"}}).lean()
		res.render("accomplishment/view-accomplishment", {currentPage: "accomplishments", accomplishment, userData: accomplishment.userId});
	} catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: "Something went wrong"})
	}
}

export default viewAccomplishment;
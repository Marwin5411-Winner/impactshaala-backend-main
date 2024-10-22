import Accomplishments from "../../models/accomplishments/accomplishments.js";
import User from '../../models/user/user.js';

const getMyAccomplishments = async (req, res) => {
	const authId = req.user.id;
	try {
		const user = await User.findOne({authId}).lean()
		if(!user) res.status(401).json({success: false, message: "User not found"})

		const acc = await Accomplishments.find({userId: user._id, approvalStatus: "APPROVED"}).populate({path: "userId", select: "name profilePic"}).lean()
		if(!acc) res.status(500).json({success: false, message: "There was some error while fetching achievements"})

			console.log(acc)

		res.json({success: true, data: acc, message: "Found Accomplishments"})
	} catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: err.message})
	}
}

export default getMyAccomplishments;
import Accomplishment from '../../../models/accomplishments/accomplishments.js';

const rejectAccomplishment = async (req, res) => {
	try {
		const accomplishments = await Accomplishment.findOne({_id: req.params.id})
		if(accomplishments.approvalStatus === "APPLIED") {
			const updated = await Accomplishment.findOneAndUpdate({_id: req.params.id}, {approvalStatus: "REJECTED"}, {new: true})
			return res.json({success: true, message: "Achievement Rejected!!"})		}
		return res.status(400).json({success: false, message: "Achievement already approved or rejected!!"})
	} catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: "Something went wrong"})
	}
}

export default rejectAccomplishment;
import Applicants from "../../../models/applicants/applicants.js";
import { jobPostStatus } from "../../../consts/userenums.js";

const updateApplicantStatus = async (req, res, next) => {
	try {
		const {newStatus} = req.body;
		const {id} = req.params

		console.log(id, newStatus)

		if(!jobPostStatus.status.includes(newStatus)) return res.status(400).json({success: false, message: "Invalid Status Value"})

		const data = await Applicants.findOneAndUpdate({_id: id}, {status: newStatus})
		if(!data) return res.status(500).json({success: false, message: "There was some error while updating the status"})
		res.status(200).json({success: true, message: "Successfully updated the status!!"})
		
	} catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: err.message})
	}
}

export default updateApplicantStatus;
import Accomplishment from '../../../models/accomplishments/accomplishments.js';
import { deleteFileFromS3 } from '../../../utils/s3_bucket.js';

const deleteAccomplishment = async (req, res) => {
	try {
		const acc = await Accomplishment.findOne({_id: req.params.id})
		acc.images.forEach(async (image) => {
			if(image) await deleteFileFromS3(image)
		})
		acc.videos.forEach(async (video) => {
			if(video) await deleteFileFromS3(video)
		})
		acc.documents.forEach(async (doc) => {
			if(doc) await deleteFileFromS3(doc)
		})
		const deletedAcc = await Accomplishment.findOneAndDelete({_id: req.params.id})
		if(deletedAcc)
			res.status(200).send({success: true, message: "Deleted Accomplishment Successfully"})
	} catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: "Error deleting achievement: " + err.message})
	}
}

export default deleteAccomplishment;
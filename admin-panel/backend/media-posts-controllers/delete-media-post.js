import MediaPost from '../../../models/media_posts/media-posts.js'
import Comment from '../../../models/comments/comments.js';
import { deleteFileFromS3 } from '../../../utils/s3_bucket.js';

const deleteMediaPost = async (req, res) => {
	try {
		const post = await MediaPost.findOne({_id: req.params.id})
		await Comment.deleteMany({_id: {$in: post.comments}})
		if(post.image && Array.isArray(post.image))
			post.image.forEach(async (image) => {
				if(image) await deleteFileFromS3(image)
			})
		const deletedPost = await MediaPost.findOneAndDelete({_id: req.params.id})
		if(deletedPost)
			res.status(200).send({success: true, message: "Deleted Poll Successfully"})
	} catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: "Error deleting poll: " + err.message})
	}
}

export default deleteMediaPost;
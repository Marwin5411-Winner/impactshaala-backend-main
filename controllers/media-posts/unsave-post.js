import User from '../../models/user/user.js';

const unsavePost = async (req, res, next) => {
	const authId = req.user.id
	try {

		// Check if the user exists
		const user = await User.findOne({authId}).lean()
		if(!user) return res.status(401).json({success: false, message: "User does not exist"})

		// Check if the post does not exist in the saved media posts list
		const postId = req.params.id
		if(!user.savedMediaPosts || !user.savedMediaPosts.map(item => item.toString()).includes(postId)) return res.status(400).json({success: false, message: "Post is not saved"})

		const response = await User.findOneAndUpdate({_id: user._id}, {$pull: {savedMediaPosts: postId}})

		if(!response) return res.status(500).json({success: false, message: "There was some error while removing the post"})
		res.json({success: true, message: "Successfully unsaved the post"})
	}
	catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: err.message})
	}
}

export default unsavePost;
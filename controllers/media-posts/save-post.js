import User from '../../models/user/user.js';

const savePost = async (req, res, next) => {
	const authId = req.user.id
	try {

		// Check if the user exists
		const user = await User.findOne({authId}).lean()
		if(!user) return res.status(401).json({success: false, message: "User does not exist"})

		// Check if the post already exists in the saved media posts list
		const postId = req.params.id
		if(user.savedMediaPosts && user.savedMediaPosts.map(item => item.toString()).includes(postId)) return res.status(400).json({success: false, message: "Post already saved"})

		const response = await User.findOneAndUpdate({_id: user._id}, {$addToSet: {savedMediaPosts: postId}})

		if(!response) return res.status(500).json({success: false, message: "There was some error while saving the post"})
		res.json({success: true, message: "Successfully saved the post"})
	}
	catch(err) {
		console.log(err)
		res.status(500).json({success: false, message: err.message})
	}
}

export default savePost;
// unpinPost.js (Controller)
import User from '../../models/user/user.js'

// Controller to unpin a post
const unpinPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id; // Assuming user is authenticated

    const user = await User.findOne({authId:userId});
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove the post from the pinnedPosts array
    user.pinnedPosts = user.pinnedPosts.filter(id => id.toString() !== postId);
    await user.save();

    return res.status(200).json({ message: "Post unpinned successfully", pinnedPosts: user.pinnedPosts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error unpinning post" });
  }
};

export default unpinPost;

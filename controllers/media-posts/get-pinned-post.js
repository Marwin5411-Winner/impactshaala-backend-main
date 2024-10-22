// getPinnedPosts.js (Controller)
import User from '../../models/user/user.js'

// Controller to get pinned posts
const getPinnedPosts = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is authenticated
    const user = await User.findOne({authId:userId}).populate('pinnedPosts');

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ pinnedPosts: user.pinnedPosts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error retrieving pinned posts" });
  }
};

export default getPinnedPosts;

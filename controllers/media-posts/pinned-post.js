// pinPost.js (Controller)
import User from '../../models/user/user.js'
import Post from '../../models/media_posts/media-posts.js'

// Controller to pin a post
const pinPost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id; // Assuming user is authenticated and their ID is available in req.user._id

    const user = await User.findOne({authId:userId});
    const post = await Post.findById(postId);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the post is already pinned
    if (user.pinnedPosts.includes(postId)) {
      return res.status(400).json({ message: "Post already pinned" });
    }

    // Pin the post
    user.pinnedPosts.push(postId);
    await user.save();

    return res.status(200).json({ message: "Post pinned successfully", pinnedPosts: user.pinnedPosts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error pinning post" });
  }
};

export default pinPost;

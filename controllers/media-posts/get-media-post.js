import MediaPosts from "../../models/media_posts/media-posts.js";
import User from "../../models/user/user.js";

const getMediaPost = async (req, res) => {
  const authId = req.user.id; // The authenticated user's ID
  const id = req.params?.id;

  if (!id) {
    return res.status(404).json({ success: true, message: "ID is Required" });
  }

  try {
    // Find the user by their authentication ID
    const user = await User.findOne({ authId }).lean();
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });

    const post = await MediaPosts.findById(id);

    if (!post) {
      return res.status(404).json({ success: true, message: "No post found" });
    }

    res.status(200).json({ success: true, post });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: err.message });
  }
};

export default getMediaPost;

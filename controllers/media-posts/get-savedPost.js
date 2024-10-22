import User from '../../models/user/user.js';

const getSavedPosts = async (req, res, next) => {
    const authId = req.user.id; // The authenticated user's ID
  
    try {
      // Find the user by their authentication ID
      const user = await User.findOne({ authId }).lean();
      if (!user) return res.status(401).json({ success: false, message: "User does not exist" });
  
      // If the user has no saved posts
      if (!user.savedMediaPosts || user.savedMediaPosts.length === 0) {
        return res.status(200).json({ success: true, message: "No saved posts", savedPosts: [] });
      }
  
      // Return the saved posts from the user's document
      const savedPosts = user.savedMediaPosts;
  
      res.status(200).json({ success: true, savedPosts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: err.message });
    }
  };
  
export default getSavedPosts;
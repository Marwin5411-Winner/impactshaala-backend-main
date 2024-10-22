import User from "../../models/user/user.js";

async function getUserProfile(req, res, next) {
  // userId is received from isUserAuthenticated middleware
  const userId = req.user.id;
  try {
    const showUserProfile = await User.findOne({ authId: userId })
      .populate({ path: "authId", select: "email" })
      .populate({ path: "collabKeywords" })
      .populate({ path: "pinnedPosts" })
      .populate({ path: "friends"});

    if (showUserProfile === null) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ success: true, data: showUserProfile });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, message: err.message });
  }
}

export default getUserProfile;

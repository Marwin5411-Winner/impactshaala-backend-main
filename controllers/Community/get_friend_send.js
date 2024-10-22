import User from "../../models/user/user.js";

const getSenderFriendRequests = async (req, res) => {
  try {
    // Find the user by ID and populate the friendRequestsSent field
    const user = await User.findById(req.user._id).populate('friendRequestsSent');

    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the friend requests that the user has sent
    return res.status(200).json({ friendRequestsSent: user.friendRequestsSent });
  } catch (error) {
    console.error(error);
    // Handle any server errors
    return res.status(500).json({ message: "Failed to get sent friend requests" });
  }
};

export default getSenderFriendRequests;

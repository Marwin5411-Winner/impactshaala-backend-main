import User from "../../models/user/user.js";

const getCommunity = async (req, res) => {
  try {
    // Find the current user by their authenticated ID
    const user = await User.findOne({ authId: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Retrieve details for all friends of the user
    const friends = await Promise.all(
      user.friends.map(async (friendId) => {
        return await User.findById(friendId);
      })
    );

    // Filter friends into Individuals and Organizations
    const individuals = friends.filter(
      (friend) => friend.accountType === "INDIVIDUAL"
    );
    const organizations = friends.filter(
      (friend) => friend.accountType === "ORGANIZATION"
    );

    // Return the response with filtered friend data
    return res.status(200).json({
      success: true,
      data: {
        individuals,
        organizations,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get community members" });
  }
};

export default getCommunity;

import FriendRequest from "../../models/user/FriendRequest.js";
import User from "../../models/user/user.js";

const getReceivedFriendRequests = async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find({ receiver: req.user._id, status: "pending" });

    if (!friendRequests || friendRequests.length === 0) {
      return res.status(404).json({ message: "Friend requests not found" });
    }

    // Map through the friend requests and populate the sender and receiver details.
    const newFriendRequests = await Promise.all(
      friendRequests.map(async (item) => {
        const receiver = await User.findOne({ authId: item.receiver });
        console.log("sender", item.sender)
        const sender = await User.findOne({ authId: item.sender });

        return {
          ...item.toObject(), // Convert Mongoose document to plain object
          receiver,
          sender,
        };
      })
    );

    console.log(newFriendRequests);

    return res.status(200).json({ friendRequestsReceived: newFriendRequests });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to get friend requests" });
  }
};

export default getReceivedFriendRequests;

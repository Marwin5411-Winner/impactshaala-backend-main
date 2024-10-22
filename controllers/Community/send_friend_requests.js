import FriendRequest from "../../models/user/FriendRequest.js";
import User from "../../models/user/user.js";
import Notification from "../../models/notifications/notifications.js";

const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body; // ID of the receiver
    
    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    console.log("Receiver ID:", receiverId);
    console.log("Authenticated user:", req.user);

    const user = await User.findOne({ authId: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (receiverId === user._id.toString()) {
      return res.status(400).json({ message: "Cannot send request to yourself" });
    }

    // Check if the friend request already exists
    const existingRequest = await FriendRequest.findOne({
      sender: req.user._id,
      receiver: receiverId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Create new friend request
    const friendRequest = new FriendRequest({
      sender: req.user._id,
      receiver: receiverId,
      status: 'pending'
    });

    await friendRequest.save();

    // Update sender's and receiver's request lists
    await User.findByIdAndUpdate(user._id, {
      $push: { friendRequestsSent: friendRequest._id }
    });
    await User.findByIdAndUpdate(receiverId, {
      $push: { friendRequestsReceived: friendRequest._id }
    });

    // Create a notification for the receiver
    const notification = new Notification({
      userId: receiverId,
      message: `You have a new friend request from ${req.user.name}`,
      type: 'FRIEND_REQUEST',
      eventId: friendRequest._id,
      eventType: 'FriendRequest',
    });

    await notification.save();

    return res.status(200).json({ message: "Friend request sent", friendRequest });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send friend request" });
  }
};

export default sendFriendRequest;

import Chat from "../../models/chats/chats.js";
import FriendRequest from "../../models/user/FriendRequest.js";
import User from "../../models/user/user.js";

const acceptFriendRequest = async (req, res) => {
  try {
    // Find the friend request
    const { requestId } = req.body;

    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest || friendRequest.status !== "pending") {
      return { message: "Invalid or already processed request" };
    }

    // Update the status to accepted
    friendRequest.status = "accepted";
    await friendRequest.save();

    const sender = await User.findOneAndUpdate(
      {
        authId: friendRequest.sender,
      },
      {
        $push: { friends: friendRequest.receiver },
      }
    );

    // await User.findByIdAndUpdate(friendRequest.receiver, {
    //   $push: { friends: friendRequest.sender }
    // });

    const receiver = await User.findOneAndUpdate(
      {
        authId: friendRequest.receiver,
      },
      {
        $push: { friends: friendRequest.sender },
      }
    );

    // Remove the friend request from both users' request lists
    await User.findOneAndUpdate(
      { authId: friendRequest.sender },
      {
        $pull: { friendRequestsSent: requestId },
      }
    );

    await User.findOneAndUpdate({ authId: friendRequest.receiver }, {
      $pull: { friendRequestsReceived: requestId },
    });

    

    const chat = new Chat({
      senderId: friendRequest.sender,
      receiverId: friendRequest.receiver,
      encryptedContent: "Hi!",
    });
    chat.save().then(async (data) => {
      res.json({
        success: true,
        message: "Message sent successfully",
        data,
      });
    });

    return { message: "Friend request accepted", friendRequest };
  } catch (error) {
    console.error("Error accepting friend request: ", error);
    return { error };
  }
};

export default acceptFriendRequest;

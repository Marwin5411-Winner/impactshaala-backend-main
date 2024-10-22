import mongoose from "mongoose";
const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
  // The user who sent the friend request
  sender: {
    type: Schema.Types.ObjectId,
    ref: "authentication",
    required: true
  },
  // The user who received the friend request
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "authentication",
    required: true
  },
  // Status of the request: pending, accepted, rejected
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
}, {
  timestamps: true
});

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);


export default FriendRequest;

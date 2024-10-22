import mongoose from 'mongoose';
import User from '../user/user.js';

User

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['FRIEND_REQUEST', 'MESSAGE', 'LIKE', 'COMMENT', 'OTHER'],
    required: true,
  },
  eventId: {  // Optional reference to the event triggering the notification (e.g., FriendRequest ID)
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'eventType',
  },
  eventType: { // Specifies which model `eventId` refers to
    type: String,
    enum: ['FriendRequest', 'Message', 'Post'],
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;

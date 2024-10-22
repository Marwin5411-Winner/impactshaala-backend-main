import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const blockedChatSchema = Schema({
  senderId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  blockedTimestamp: {
    type: Date,
    default: Date.now
  }
});


const BlockedChats = mongoose.model('BlockedChats', blockedChatSchema);

export default BlockedChats;

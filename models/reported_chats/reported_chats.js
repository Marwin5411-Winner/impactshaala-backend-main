import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reportChatSchema = Schema({
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
  reportedTimestamp: {
    type: Date,
    default: Date.now
  }
});


const ReportedChats = mongoose.model('ReportedChats', reportChatSchema);

export default ReportedChats;

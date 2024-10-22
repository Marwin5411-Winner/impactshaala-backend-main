import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: 'authentication',
    required: true
  },
  receiverId: {
    type:mongoose.Schema.ObjectId,
    ref: 'authentication',
    required: true
  },
  encryptedContent: {
    type: String,
    default: '',
  },
  attachment: {
    type: String,
    default: '',
  },
  iv: {
    type: String,
    // required: true
  },
  isViewed: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
},{
    timestamps:true,
  }
);


const Chat = mongoose.model('Chat', chatSchema);

export default Chat;

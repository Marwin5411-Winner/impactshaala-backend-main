import mongoose from 'mongoose';
import {chatsSettingsEnum} from "../../consts/userenums.js";

const chatSettings = mongoose.Schema({
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  receiveMessagesFrom: {
      type: String,
      enum: chatsSettingsEnum.settings,
      default: 'EVERYONE'
  }
},{
    timestamps:true,
  }
);


const ChatSettings = mongoose.model('chatSettings',chatSettings);

export default ChatSettings;

import Chat from "../../models/chats/chats.js"

export const getChats = ({senderId, receiverId}) => {
	return Chat.find({senderId: [senderId, receiverId], receiverId: [senderId, receiverId]}).lean()
}
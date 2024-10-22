import Chat from "../../models/chats/chats.js"
import BlockedChats from "../../models/blocked_chats/blocked_chats.js"

export const checkBlockedUser= ({senderId, receiverId}) => {
	return BlockedChats.findOne({senderId: [senderId, receiverId], receiverId: [senderId, receiverId]}).lean()
}
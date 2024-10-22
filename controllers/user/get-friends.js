import User from "../../models/user/user.js";
import Chat from "../../models/chats/chats.js";

export const getFriends = async (id) => {
	const data = await Chat.find({$or: [{senderId: id}, {receiverId: id}]}).lean()
	const others = data.map(item => {
		if(item.senderId.toString() === id)
			return item.receiverId.toString()
		else return item.senderId.toString()
	}).filter(item => item != id)
	const distinctOthers = [... new Set(others)]
	const tempData = (await User.find({authId: distinctOthers}).populate("authId").lean())	
	// const tempData = await User.find({authId: {$ne: id}}).populate("authId").lean()
	return tempData
}
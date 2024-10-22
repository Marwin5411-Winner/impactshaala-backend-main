import Chat from '../../models/chats/chats.js';

const saveChat = ({senderId, receiverId, message, attachment}) => {
	const chat = new Chat({senderId, receiverId, encryptedContent: message, attachment})
	return chat.save()
}

export default saveChat;
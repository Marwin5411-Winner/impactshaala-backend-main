import User from "../../models/user/user.js";

export const updateLastSeen = (id) => {
	const time = new Date();
	return User.findOneAndUpdate({authId: id}, {lastSeen: time})
}
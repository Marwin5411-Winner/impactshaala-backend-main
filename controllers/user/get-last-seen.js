import User from "../../models/user/user.js"

export const getLastSeen = (id) => {
	return User.findOne({authId: id}).lean()
}
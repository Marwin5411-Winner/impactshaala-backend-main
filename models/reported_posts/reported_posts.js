import mongoose from "mongoose";
import { postEnums } from "../../consts/userenums.js"
import { reportPostsContent } from "../../consts/userenums.js";

const Schema = mongoose.Schema;

const reportPostSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	type: {
		type: String,
		enum: postEnums,
		required: true,
	},
	media_post_id: {
		type: Schema.Types.ObjectId,
		ref: 'media-posts',
	},
	polls_id: {
		type: Schema.Types.ObjectId,
		ref: "polls"
	},
	reason:{
		type:String,
		enum: reportPostsContent.reportOptions,
	}
});

const User = mongoose.model('reported-posts', reportPostSchema);

export default User;

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
	writer: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	text: {
		type: String,
		required: true,
	}
});

const User = mongoose.model('comments', commentsSchema);

export default User;

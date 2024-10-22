import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
	collaborationType: {
		type: String,
		required: true,
	},
	projectTitle: {
		type: String,
		required: true,
	},
	collaborateWith: {
		type: String,
		required: true,
	},
	stakeholders: {
		type: [{
			type: String,
			required: true,
		}],
		default: [],
	},
	prividing: {
		type: [{
			type: String,
			required: true,
		}],
		default: [],
	},
	receiving: {
		type: [{
			type: String,
			required: true,
		}],
		default: [],
	},
	language: {
		type: [{
			type: String,
			required: true,
		}],
		default: [],
	},
	tenure: {
		type: String,
		required: true,
	},
	objective: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	locationType: {
		type: String,
		required: true,
	},
	serviceType: {
		type: String,
		required: true,
	},
	minServicePrice: {
		type: Number, 
		default: 0,
	},
	specialNotes: String,
	attachment: String,
	maxServicePrice: {
		type: Number,
		default: 0,
	},
	collaborators: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		}],
		default: []
	},
}, {
	timestamps: true,
})

const Project = mongoose.model('project', ProjectSchema)

export default Project
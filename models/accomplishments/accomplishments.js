import mongoose from 'mongoose'

const AccomplishmentsSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	projectTitle: {
		type: String, 
		required: true,
	},
	collaborations: {
		type: String, 
		required: false,
	},
	startDate: {
		type: Date,
		required: false,
	},
	endDate: {
		type: Date,
		required: false,
	},
	primaryObjective: {
		type: String,
		required: false,
	},
	keyDeliverables: {
		type: String,
		required: false,
	},
	approach: {
		type: String,
		required: false,
	},
	activities: {
		type: [String],
		default: [],
	},
	challenges: {
		type: [String],
		default: [],
	},
	educationalImpact: {
		type: String,
		required: true,
	},
	innovativeApproach: String,
	impactLevel: String,
	lastingImpact: String,
	projectAdequacy: String,
	achievements: {
		type: [String],
		default: [],
	},
	testimonials: {
		type: [String],
		required: false,
	},
	images: {
		type: [String],
		default: []
	},
	videos: {
		type: [String],
		default: [],
	},
	documents: {
		type: [String],
		default: [],
	},
	approvalStatus: {
		type: String,
		enum: ["APPLIED", "APPROVED", "UNDER REVIEW", "REJECTED"],
		required: true,
	}
}, {
	timestamps: true,
})

const Accomplishments = mongoose.model('accomplishments', AccomplishmentsSchema)

export default Accomplishments
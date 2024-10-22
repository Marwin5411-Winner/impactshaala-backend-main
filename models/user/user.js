import mongoose from "mongoose";
import MediaPosts from "../media_posts/media-posts.js";

const Schema = mongoose.Schema;
MediaPosts


// Define an embedded schema for Accomplishments
const accomplishmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  files: [{
    type: String,  // File URLs or paths can be stored as strings
  }],
  approvalStatus: {
    type: String,
    enum: ['APPLIED', 'APPROVED', 'REJECTED'],  // Example statuses
    default: 'APPLIED'
  },
}, { timestamps: true });

const userSchema = new Schema({
  authId: {
    type: Schema.ObjectId,
    ref: 'authentication',
    required: true
  },
  accountType: {
    type: String,
    required: true
  },
  userType1: {
    type: String,
    required: true
  },
  userType2: {
    type: String,
  },
  userType3: {
    type: String,
  },
  userType4: {
    type: String,
  },
  userType5: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  tagline: String,
  description: String,
  website: String,
  countryCode: Number,
  collabKeywords: [{
    type: Schema.Types.ObjectId,
    ref: 'collaboration',
  }],
  contactNo: {
    type: String,
  },
  comEmail: {
    type: String,
  },
  address: String,
  city: String,
  district: String,
  state: String,
  country: String,
  pinCode: String,
  profilePic: {
    type: String,
    default: ''
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  admins: [{
    name: {
      type: String,
    },
    authId: {
      type: Schema.Types.ObjectId,
      ref: 'authentication'
    }
  }],
  savedMediaPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'media-posts',
    required: true,
  }],
  savedPolls: [{
    type: Schema.Types.ObjectId,
    ref: "polls",
    required: true,
  }],
  location: String,
  foundingYear: Number,
  industry: String,
  organizationSize: Number,
  workExperience: [{
    designation: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    nameOfOrganization: {
      type: String,
      required: true,
    },
  }],
  highestEducation: String,
  educationalInstitution: String,
  course: String,
  friends: [{
    type: Schema.Types.ObjectId,
    ref: "authentication"
  }],
  friendRequestsSent: [{
    type: Schema.Types.ObjectId,
    ref: "FriendRequest"
  }],
  friendRequestsReceived: [{
    type: Schema.Types.ObjectId,
    ref: "FriendRequest"
  }],
   // other user fields
   pinnedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'media-posts',
    }
  ],
  // Embedded accomplishments array
  accomplishments: [accomplishmentSchema],
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;

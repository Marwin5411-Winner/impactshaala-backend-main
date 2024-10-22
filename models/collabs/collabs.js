import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const collaborationKeywords = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    collabTag:{
        type:String,
        unique: true,
    }
});


const CollaborationKeywords = mongoose.model('collaboration',collaborationKeywords);

export default CollaborationKeywords;
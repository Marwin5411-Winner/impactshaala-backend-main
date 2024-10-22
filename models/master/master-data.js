import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MstUserTypeModelSchema = new Schema({
    _id: {
      type: String,
      required: true
    },
    slNo: {
      type: Number,
      required: true
    },
    accountType: {
      type: String,
      enum: ['ORGANIZATION'],
      required: true
    },
    userType1label: {
      type: String,
      required: true
    },
    userType1: {
      type: String,
      required: true
    },
    userType2label: String,
    userType2: String,
    userType3label: String,
    userType3: String,
    userType4label: String,
    userType4: String,
    userType5label: String,
    userType5: String
  });

  const MstUserTypeModel = mongoose.model('mst-user-types', MstUserTypeModelSchema);

export default MstUserTypeModel;
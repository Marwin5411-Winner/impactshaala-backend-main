import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const enquires = Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    subject:{
        type:String,
        required: true,
    },
    message:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        default:'OPEN'
    },
});


const Enquiry = mongoose.model('Enquiry',enquires);

export default Enquiry;
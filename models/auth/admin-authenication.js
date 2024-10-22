import mongoose from 'mongoose';


const adminSchema = mongoose.Schema({
    email: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
},{
    timestamps:true,
});


const AdminSchema = mongoose.model('admin-schema',adminSchema);

export default AdminSchema;
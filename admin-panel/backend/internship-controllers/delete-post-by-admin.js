import Internship from "../../../models/internship/internship.js";


async function deletePostByAdmin(req,res,next){
    try{
        const {uid} = req.query;

        let deleteJobPost = await Internship.findByIdAndDelete(uid);
        console.log(`Delete : ${deleteJobPost}`);
        return res.status(200).send({success:true,message:"Delete job post successfully"});
    }catch(err){
        return res.status(500).send({success:false,message:err.message});
    }
}

export default deletePostByAdmin;
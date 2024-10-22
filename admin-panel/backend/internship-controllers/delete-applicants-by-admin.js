import Applicants from "../../../models/applicants/applicants.js";


async function deleteApplicantsByAdmin(req,res,next){
    try{
        const {uid} = req.query;

        console.log(`Check re the id you are  getting  : ${uid}`);

        let deleteJobPost = await Applicants.findByIdAndDelete(uid);
        console.log(`Delete : ${deleteJobPost}`);
        return res.status(200).send({success:true,message:"Deleted job applicant successfully"});
    }catch(err){
        return res.status(500).send({success:false,message:err.message});
    }
}

export default deleteApplicantsByAdmin;
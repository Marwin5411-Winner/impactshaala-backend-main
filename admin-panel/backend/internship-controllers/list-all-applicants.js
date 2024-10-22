import Applicants from "../../../models/applicants/applicants.js";
import {applicantsStatus} from "../../../consts/userenums.js";

let applicantStatus = applicantsStatus.status;

async function listAllApplicants(req,res,next){
    try{
        // const allApplicants = (await Applicants.find().populate({path:'userId',select:'name authId',populate:{path:'authId',select:'email'}})).filter(applicant => applicant.userId !== null)
        const allApplicants = await Applicants.find().populate({path: "userId", select: "name"}).lean()
        return res.render("internship/applicants", {currentPage: "applicants",allApplicants:allApplicants,applicantStatus:applicantStatus});
    }catch(err){
        return res.status(500).send({success:false,});
    }
}

export default listAllApplicants;
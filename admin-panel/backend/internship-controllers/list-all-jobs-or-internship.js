import Internship from "../../../models/internship/internship.js";
import {jobPostStatus} from "../../../consts/userenums.js";

let jobStatus = jobPostStatus.status; 

async function listAllJobsOrApplicants(req,res,next){
    try{
        let getAllJobs = await Internship.find().populate({path:'userId',select:'name authId',populate:{path:'authId',select:'email'}});
        return res.render("internship/internship-or-job-posting", {currentPage: "internship",getAllJobs:getAllJobs.filter((job) => !!job.userId), jobStatus:jobStatus});
    } catch(err){
        return res.status(500).send({success:false,});
    }
}

export default listAllJobsOrApplicants;
import Internship from "../../models/internship/internship.js";
import checkUserPermission from "../../utils/check-user-permission.js";
import User from "../../models/user/user.js";

async function searchJobsOrInternship(req,res,next){
    // userId is received from isUserAuthenticated middleware
    const userId = req.user.id;
    try{
        const user = await User.findOne({authId: userId});

        if(!user){
            return res.status(404).json({success: false,message: "User not found"});
        }

        var checkPermission =await checkUserPermission(userId,res,next);

        if(checkPermission!==false){
            return res.status(401).json({success:false,message:"You do not have permission to search a job or internship"});
        }

        if(checkPermission!==true && checkPermission!==false){
            return res.status(500).json({success:false,message:"Something went wrong"});
        }

        // Extract search parameters from the request query
        const { jobName, location, workplaceType } = req.query;

        // Construct the query based on the search parameters
        const query = {};

        if (jobName) {
            query.jobTitle = { $regex: new RegExp(jobName, 'i') }; // Case-insensitive search for job title
        }

        if (location) {
            query.jobLocation = { $regex: new RegExp(location, 'i') }; // Case-insensitive search for job location
        }

        if (workplaceType) {
            query.workplaceType = { $regex: new RegExp(workplaceType, 'i') }; // Case-insensitive search for workplace type
        }

        let jobs = await Internship.find(query  ).populate({ path: 'userId', select:'collabKeywords',populate: { path: 'collabKeywords' } });


        if(jobs.length===0){
            return res.status(404).json({success: false,message:"We couldn't find any jobs matching the criteria you provided."})
        }

        return res.status(200).json({success:true,data:jobs});


    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default searchJobsOrInternship;
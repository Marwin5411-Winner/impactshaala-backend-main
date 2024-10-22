import User from '../../models/user/user.js';

async function searchProfile(req,res,next){
    try{

        // Extract search parameters from the request query
        const { name } = req.query;

        const query = {};

        if (name) {
            query.name = { $regex: new RegExp(name, 'i') };
        }

        const userProfile = await User.find(query).select('_id authId name tagline description profilePic');

        if(userProfile.length===0){
            return res.status(400).json({success:false,message:"The user you are looking for could not be found."});
        }
        return res.status(200).json({success: true,data:userProfile});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}


export default searchProfile;
import User from '../../models/user/user.js';

async function searchProfileById(req,res,next){
    try{
        const id = req.params.id;
        const getUserById = await User.findOne({_id: id})
        .populate("collabKeywords")
        .populate("friends");
        if(getUserById.length === 0){
            return res.status(400).json({success:false,message:"Couldn't find the user your looking for."});
        }
        return res.status(200).json({success:true,data:getUserById});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export default searchProfileById;
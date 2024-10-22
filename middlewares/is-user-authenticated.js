import jwt from "jsonwebtoken";
import Authentication from "../models/auth/authenication.js";


const isUserAuthenticated = async (req,res,next) => {
    let token;
    try{
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }else{
            return res.status(401).json({message: "You are not authorized to access this resource."});
        }

        if(token===null){
            res.status(401).json({message:'Your unauthorized to access this resource,login first access this resources'});
        }

        const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const user = await Authentication.findById(verifyToken.userId);

        if(!user){
            //next(new NoDataError('User not found'));
            return res.status(404).json({message:'User not found'});
        }

        if(user.isActive!=='ACTIVE' || user.isVerified!=="VERIFIED"){
            return res.status(404).json({message:"Please verify your email first"});
        }

        req.user = user;
        req.timestamp = verifyToken.iat;

        next();
    }
    catch(err){
        return res.status(200).json({message: err.message});
    }
}

export default isUserAuthenticated;
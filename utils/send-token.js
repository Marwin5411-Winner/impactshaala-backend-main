import getToken from './create-token.js';

const sendToken = async(user,statusCode,res,timeStamps)=>{
    // get token 
    const token = getToken(user.authId,timeStamps);
    // options for cookie
     const options = {
        expires : new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000)
    }

    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        success:true,
        message: 'Your are logged in successfully',
        data:user,
        token
    });
}

export default sendToken;
import verifyAndDecryptToken from "../../utils/decryptionhelper.js"

async function verifyResetPasswordToken(req,res,next){
    try{
        const encryptedToken = req.headers.authorization;

        if(encryptedToken===null){
            return res.status(500).json({message:"something went wrong"});
        }

        const verifyToken =await verifyAndDecryptToken(encryptedToken,res);
        var expirationTime = verifyToken.exp;
        const currentTime = Math.floor(Date.now() / 1000);

        // Calculate remaining time in seconds
        const remainingTimeInSeconds = expirationTime - currentTime;

        // console.log(`Token will expire in ${remainingTimeInSeconds} seconds.`);

        if(remainingTimeInSeconds>0){
            return res.status(200).json({
            tokenValid : true,
            message:"Link has verified successfully please set new password",
        });
        }else{
            return res.status(401).json({
                tokenValid : false,
                message:"Sorry, it looks like your verification link has expired. Please generate a new one to complete the process.",
            });
        }

    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export default verifyResetPasswordToken;
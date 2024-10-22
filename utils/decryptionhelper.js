import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const ENC= process.env.ENCRYPTION_KEY;
const IV = process.env.IV;
const ALGO = process.env.ALGO;

// Function to decrypt data using AES decryption
const decryptAES = ((encodeData) =>
{
    // use decodeURIComponent to remove '/' (forward slashes) or there browser will treat it as separate routes
    let encryptedData = decodeURIComponent(encodeData);
   let decipher = crypto.createDecipheriv(ALGO, ENC, IV);
   let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
   return (decrypted + decipher.final('utf8'));
});

// Function to verify the JWT token
const verifyAndDecryptToken = async(token,res) => {
    try {
        const decryptedToken = decryptAES(token);
        // console.log(`decryptedToken : ${decryptedToken}`);
        const decodedToken = jwt.verify(decryptedToken, process.env.JWT_SECRET_KEY);
        // console.log(`decodedToken : ${decodedToken.userId}`);
        return decodedToken;
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'Link has expired  please set regenerate link again'
        });
    }
};


export default verifyAndDecryptToken;
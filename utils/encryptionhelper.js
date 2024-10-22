import crypto from 'crypto';
import jwt from 'jsonwebtoken';


const ENC= process.env.ENCRYPTION_KEY;
const IV = process.env.IV;
const ALGO = process.env.ALGO;

// // Function to encrypt data using AES encryption
const encryptAES = ((data) => 
{
   let cipher = crypto.createCipheriv(ALGO, ENC, IV);
   let encrypted = cipher.update(data, 'utf8', 'base64');
   encrypted += cipher.final('base64');
   return encrypted;
});


// Function to generate verification token
const generateVerifyToken = (userId, timestamp,expiresIn) => {
    const payload = {
        userId: userId,
        timestamp: timestamp
    }

    const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY,{
        expiresIn:expiresIn|| process.env.JWT_EXPIRES_IN
    });
    //console.log(`jwtToken : ${jwtToken}`);
    let encryptedToken = encryptAES(jwtToken);
    // use encodeURIComponent to remove '/' (forward slashes) or there browser will treat it as separate routes
    encryptedToken = encodeURIComponent(encryptedToken);
    //console.log(`encryptedToken: ${encryptedToken}`);
    return encryptedToken;
};

export default generateVerifyToken;

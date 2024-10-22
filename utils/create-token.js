import jwt from 'jsonwebtoken';

const createToken = (id, timeStamps) => {
    const payload = {
        userId: id,
        timestamp: timeStamps
      };
    return jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
}

export default createToken;

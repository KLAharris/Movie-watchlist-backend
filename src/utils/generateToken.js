import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
    const payload = { id : userId };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { 
        expiresIn: process.env.jwtExpiresIn || '7d'
     });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return token;
};

export default generateToken;
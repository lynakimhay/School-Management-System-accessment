const jwt = require('jsonwebtoken');

const secretKey = "yourSecretKey"; 

const generateToken = (userId) => {
    const payload = {
        userId, 
        role: "user"
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); 
    console.log("Generated Token:", token);
    return token;
};
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        console.log("Decoded Token:", decoded);
        return decoded;
    } catch (err) {
        console.error("Token verification failed:", err.message);
        return null;
    }
};

verifyToken(token); 

const token = generateToken("12345");

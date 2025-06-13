const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {


        // get token from authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({ message: "Authorization token missing" });
        }

        const token = authHeader.split(" ")[1];

        //Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Attach user ID to request
        req.user = decoded.id;

        next();
    } catch (error) {
        console.error("Auth Error", error);
        res.status(401).json({message:"Invalid or expired token"});
    }
};

module.exports = authMiddleware
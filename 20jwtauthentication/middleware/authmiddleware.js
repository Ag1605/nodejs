
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check whether token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                message: "Access denied. Token required."
            });

        }

        // Extract token after Bearer
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store decoded information in request
        req.user = decoded;

        // Move to next middleware or route
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

}

module.exports = authMiddleware;

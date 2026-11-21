
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check token existence and Bearer format
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                message: "Access denied. Token required."
            });

        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store decoded user information
        req.user = decoded;

        // Continue to next middleware
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

}

module.exports = authMiddleware;

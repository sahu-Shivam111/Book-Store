const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            message: "Access Denied"
        });
    }

    const token = header.split(" ")[1];

    try {

        const user = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = user;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }
}

module.exports = verifyToken;
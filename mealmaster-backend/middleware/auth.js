const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

module.exports = function (req, res, next) {
    try {
        const auth = req.headers.authorization;
        if (!auth) return res.status(401).json({ message: "No token" });
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "your_jwt_secret_here"; // CHANGE THIS

// --------------------- LOGIN -----------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Incorrect password" });

        // Create JWT token
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "7d" });

        return res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

// --------------------- SIGNUP (Optional) -----------------------
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check existing user
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists" });

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashed });
        await user.save();

        return res.json({ message: "User created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
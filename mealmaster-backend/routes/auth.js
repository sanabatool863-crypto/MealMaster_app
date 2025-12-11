const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// SIGNUP ------------------------------------------------
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        res.json({ message: "Signup successful" });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

// LOGIN ------------------------------------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({ token });
    } catch {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
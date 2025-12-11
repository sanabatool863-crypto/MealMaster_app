const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// SIGNUP ------------------------------------------------
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        console.error("Signup error:", err);
        
        // Handle specific MongoDB errors
        if (err.name === "MongoServerError" && err.code === 11000) {
            return res.status(400).json({ message: "Email already registered" });
        }
        
        if (err.name === "ValidationError") {
            return res.status(400).json({ message: err.message });
        }
        
        res.status(500).json({ message: "Server error: " + err.message });
    }
});

// LOGIN ------------------------------------------------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET);

        res.json({ token });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
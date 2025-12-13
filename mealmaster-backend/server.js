require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recipeRoutes = require("./routes/recipes");
const listRoutes = require("./routes/list");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

// Home test route
app.get("/", (req, res) => {
    res.send("MealMaster API running without auth");
});

// Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/list", listRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// ❗ If missing, exit
if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing in environment variables");
    process.exit(1);
}

// ⭐ ONLY THIS PART IS CHANGED — Matching your CoffeeShop style
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB successfully!");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(() => {
        console.log("❌ MongoDB connection failed: [no response]");
        process.exit(1);
    });

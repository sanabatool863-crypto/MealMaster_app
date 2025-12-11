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

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error(err));
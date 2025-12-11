const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// GET all recipes or filter by diet: /api/recipes?diet=vegan
router.get("/", async (req, res) => {
    try {
        const { diet } = req.query;

        const filter = diet ? { dietType: diet } : {};
        const recipes = await Recipe.find(filter);

        res.json(recipes);
    } catch (err) {
        console.error("Error fetching recipes:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// 🔥 NEW — GET a single recipe by ID (required for details screen)
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        res.json(recipe);
    } catch (err) {
        console.error("Error fetching recipe:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/recipes (create new recipe)
router.post("/", async (req, res) => {
    try {
        const recipe = new Recipe(req.body);
        await recipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        console.error("Error creating recipe:", err.message);
        res.status(400).json({ message: "Bad request" });
    }
});

module.exports = router;
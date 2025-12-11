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
        if (err.name === "CastError") {
            return res.status(400).json({ message: "Invalid recipe ID" });
        }
        res.status(500).json({ message: "Server error" });
    }
});

// POST /api/recipes (create new recipe)
router.post("/", async (req, res) => {
    try {
        const { name, dietType, image, ingredients, steps } = req.body;

        // Validation
        if (!name || !image || !ingredients || !steps) {
            return res.status(400).json({ message: "Missing required fields: name, image, ingredients, and steps are required" });
        }

        if (!Array.isArray(ingredients) || ingredients.length === 0) {
            return res.status(400).json({ message: "Ingredients must be a non-empty array" });
        }

        if (!Array.isArray(steps) || steps.length === 0) {
            return res.status(400).json({ message: "Steps must be a non-empty array" });
        }

        const recipe = new Recipe({
            name,
            dietType: dietType || "regular",
            image,
            ingredients,
            steps
        });
        
        await recipe.save();
        res.status(201).json(recipe);
    } catch (err) {
        console.error("Error creating recipe:", err.message);
        if (err.name === "ValidationError") {
            return res.status(400).json({ message: err.message });
        }
        res.status(400).json({ message: "Bad request" });
    }
});

module.exports = router;
// routes/list.js
const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// POST /api/list/generate
// body: { recipeIds: ["id1", "id2"] }
router.post("/generate", async (req, res) => {
    try {
        const { recipeIds } = req.body;

        if (!recipeIds || !Array.isArray(recipeIds) || recipeIds.length === 0) {
            return res.status(400).json({ message: "recipeIds is required" });
        }

        const recipes = await Recipe.find({ _id: { $in: recipeIds } });

        const itemsMap = new Map();

        recipes.forEach((recipe) => {
            recipe.ingredients.forEach((ing) => {
                const key = ing.name.toLowerCase();

                if (!itemsMap.has(key)) {
                    itemsMap.set(key, {
                        name: ing.name,
                        quantities: [ing.quantity],
                    });
                } else {
                    itemsMap.get(key).quantities.push(ing.quantity);
                }
            });
        });

        const groceryList = Array.from(itemsMap.values()).map((item) => ({
            name: item.name,
            quantity: item.quantities.join(" + "), // simple merge
        }));

        res.json({ items: groceryList });
    } catch (err) {
        console.error("Error generating list:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
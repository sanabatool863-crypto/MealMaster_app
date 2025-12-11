const mongoose = require("mongoose");

const IngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
});

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dietType: {
        type: String,
        enum: ["regular", "vegan", "vegetarian", "keto", "diabetic"],
        default: "regular",
    },
    image: { type: String, required: true },   
    ingredients: [IngredientSchema],
    steps: { type: [String], required: true },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");

const MONGO_URI = process.env.MONGO_URI;

const recipes = [
    {
        name: "Chicken Salad Bowl",
        dietType: "regular",
        image: "https://images.pexels.com/photos/9893216/pexels-photo-9893216.jpeg",
        ingredients: [
            { name: "Chicken breast", quantity: "200g, cooked & shredded" },
            { name: "Lettuce", quantity: "1 cup, chopped" },
            { name: "Cherry tomatoes", quantity: "6 pieces, halved" },
            { name: "Cucumber", quantity: "1/2 cup, sliced" },
            { name: "Olive oil", quantity: "1 tbsp" },
            { name: "Lemon juice", quantity: "1 tsp" },
            { name: "Black pepper", quantity: "1/4 tsp" },
            { name: "Salt", quantity: "to taste" }
        ],
        steps: [
            "Boil or grill chicken, then shred it.",
            "Chop vegetables into bite-sized pieces.",
            "Mix olive oil, lemon juice, salt, and pepper.",
            "Combine everything in a bowl and serve."
        ]
    },
    {
        name: "Vegan Lentil Curry",
        dietType: "vegan",
        image: "https://images.pexels.com/photos/28674710/pexels-photo-28674710.jpeg",
        ingredients: [
            { name: "Red lentils", quantity: "1 cup" },
            { name: "Onion", quantity: "1 medium, chopped" },
            { name: "Tomato", quantity: "2 medium, chopped" },
            { name: "Garlic", quantity: "3 cloves, minced" },
            { name: "Ginger", quantity: "1 tsp, minced" },
            { name: "Turmeric", quantity: "1/2 tsp" },
            { name: "Curry powder", quantity: "1 tbsp" },
            { name: "Coconut milk", quantity: "1/2 cup" },
            { name: "Water", quantity: "1.5 cups" },
            { name: "Salt", quantity: "to taste" }
        ],
        steps: [
            "Rinse lentils thoroughly.",
            "Saute onion, garlic, and ginger for 2 minutes.",
            "Add tomatoes and cook until soft.",
            "Mix in spices and lentils.",
            "Add water and simmer for 15 minutes.",
            "Pour in coconut milk and cook for 5 more minutes."
        ]
    },
    {
        name: "Keto Cheese Omelette",
        dietType: "keto",
        image: "https://images.pexels.com/photos/15076696/pexels-photo-15076696.jpeg",
        ingredients: [
            { name: "Eggs", quantity: "2 large" },
            { name: "Cheddar cheese", quantity: "1/3 cup, grated" },
            { name: "Butter", quantity: "1 tbsp" },
            { name: "Salt", quantity: "pinch" },
            { name: "Black pepper", quantity: "1/4 tsp" }
        ],
        steps: [
            "Whisk eggs with salt and pepper.",
            "Melt butter on low heat.",
            "Pour eggs and cook halfway.",
            "Sprinkle cheese and fold omelette.",
            "Cook for 1 more minute and serve."
        ]
    },
    {
        name: "Diabetic Oats Veg Bowl",
        dietType: "diabetic",
        image: "https://images.pexels.com/photos/10695966/pexels-photo-10695966.jpeg",
        ingredients: [
            { name: "Oats", quantity: "1 cup, cooked in water" },
            { name: "Carrot", quantity: "1/4 cup, grated" },
            { name: "Cucumber", quantity: "1/4 cup, chopped" },
            { name: "Spinach", quantity: "1/4 cup, chopped" },
            { name: "Yogurt (unsweetened)", quantity: "2 tbsp" },
            { name: "Lemon juice", quantity: "1 tbsp" },
            { name: "Black pepper", quantity: "1/4 tsp" }
        ],
        steps: [
            "Cook oats in water and let cool.",
            "Prepare all vegetables.",
            "Mix oats, yogurt, vegetables, and lemon juice.",
            "Add pepper and serve chilled."
        ]
    },
    {
        name: "Vegetarian Paneer Wrap",
        dietType: "vegetarian",
        image: "https://images.pexels.com/photos/2955819/pexels-photo-2955819.jpeg",
        ingredients: [
            { name: "Paneer", quantity: "120g, grilled or pan-fried" },
            { name: "Whole-wheat tortilla", quantity: "1 large" },
            { name: "Mint chutney", quantity: "2 tbsp" },
            { name: "Onion", quantity: "1/4 cup, sliced" },
            { name: "Capsicum", quantity: "1/4 cup, sliced" },
            { name: "Black pepper", quantity: "1/4 tsp" }
        ],
        steps: [
            "Warm the tortilla.",
            "Spread mint chutney.",
            "Add grilled paneer and vegetables.",
            "Sprinkle pepper.",
            "Roll tightly, toast lightly, and serve."
        ]
    },
    {
        name: "High Protein Chicken Rice Bowl",
        dietType: "regular",
        image: "https://images.pexels.com/photos/5836775/pexels-photo-5836775.jpeg",
        ingredients: [
            { name: "Grilled chicken", quantity: "200g, sliced" },
            { name: "Brown rice", quantity: "1 cup, cooked" },
            { name: "Broccoli", quantity: "1/2 cup, steamed" },
            { name: "Soy sauce", quantity: "1 tbsp" },
            { name: "Carrots", quantity: "1 tbsp, chopped" }
        ],
        steps: [
            "Place warm rice in a bowl.",
            "Add sliced chicken and steamed broccoli.",
            "Drizzle soy sauce.",
            "Garnish with Carrots and serve."
        ]
    },
    {
        name: "Vegan Buddha Bowl",
        dietType: "vegan",
        image: "https://images.pexels.com/photos/5182119/pexels-photo-5182119.jpeg",
        ingredients: [
            { name: "Quinoa", quantity: "1 cup, cooked" },
            { name: "Chickpeas", quantity: "1/2 cup, roasted" },
            { name: "Avocado", quantity: "1/2 sliced" },
            { name: "Spinach", quantity: "1 cup, fresh" },
            { name: "Carrot", quantity: "1/4 cup, shredded" },
            { name: "Tahini sauce", quantity: "1 tbsp" }
        ],
        steps: [
            "Cook quinoa and cool slightly.",
            "Assemble veggies in a bowl.",
            "Add roasted chickpeas.",
            "Drizzle tahini sauce.",
            "Serve fresh."
        ]
    },
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB for seeding");

        await Recipe.deleteMany({});
        await Recipe.insertMany(recipes);

        console.log("Seeding done");
        process.exit(0);
    } catch (err) {
        console.error("Seeding error:", err.message);
        process.exit(1);
    }
}

seed();
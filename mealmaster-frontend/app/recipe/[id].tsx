import React, { useState, useEffect, useCallback } from "react";
import { useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import axios from "axios";

const BASE_URL = "http://192.168.0.120:5000";

interface Ingredient {
    name: string;
    quantity: string;
}

interface Recipe {
    _id: string;
    name: string;
    dietType: string;
    image: string;
    ingredients: Ingredient[];
    steps: string[];
}

export default function RecipeDetails() {
    const { id } = useLocalSearchParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchRecipe = useCallback(async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/recipes/${id}`);
            setRecipe(res.data);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchRecipe();
    }, [fetchRecipe]);

    if (loading || !recipe) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2EC4B6" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* HERO IMAGE */}
            <Image source={{ uri: recipe.image }} style={styles.hero} />

            {/* TITLE */}
            <Text style={styles.title}>{recipe.name}</Text>

            {/* BADGE */}
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{recipe.dietType}</Text>
            </View>

            {/* INGREDIENTS */}
            <Text style={styles.section}>Ingredients</Text>
            {recipe.ingredients.map((ing, index) => (
                <Text key={index} style={styles.item}>
                    {"\u2022"} {ing.name}: {ing.quantity}
                </Text>
            ))}

            {/* STEPS */}
            <Text style={styles.section}>Steps</Text>
            {recipe.steps.map((step, index) => (
                <Text key={index} style={styles.item}>
                    {index + 1}. {step}
                </Text>
            ))}

            {/* BUTTON */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add to Grocery</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6FFFC",
    },

    container: {
        backgroundColor: "#F6FFFC",
        flex: 1,
        padding: 20,
        paddingTop: 40,
    },

    hero: {
        width: "100%",
        height: 250,
        borderRadius: 20,
        marginBottom: 16,
        backgroundColor: "#D8EAE5",
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#2A2A2A",
    },

    badge: {
        backgroundColor: "#CBF3F0",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
        marginBottom: 18,
        marginTop: 8,
    },

    badgeText: {
        color: "#05676A",
        fontWeight: "700",
        textTransform: "capitalize",
    },

    section: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2A2A2A",
        marginTop: 20,
        marginBottom: 8,
    },

    item: {
        fontSize: 15,
        color: "#55616D",
        marginBottom: 6,
        lineHeight: 22,
    },

    button: {
        backgroundColor: "#2EC4B6",
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30,
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },
});
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

const BASE_URL = "http://192.168.0.120:5000";

export default function Add() {
    const [name, setName] = useState("");
    const [diet, setDiet] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");

    const submit = async () => {
        try {
            const ingList = ingredients.split(",").map((s) => {
                const [n, q] = s.split("-");
                return { name: n.trim(), quantity: q?.trim() || "" };
            });

            const stepsList = steps.split(",").map((s) => s.trim());

            await axios.post(`${BASE_URL}/api/recipes`, {
                name,
                dietType: diet,
                ingredients: ingList,
                steps: stepsList,
            });

            alert("Recipe added!");
        } catch {
            alert("Error adding recipe.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add Recipe</Text>

            <TextInput
                style={styles.input}
                placeholder="Recipe Name"
                placeholderTextColor="#7D8A95"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Diet Type (vegan, keto, etc.)"
                placeholderTextColor="#7D8A95"
                value={diet}
                onChangeText={setDiet}
            />

            <TextInput
                style={[styles.input, styles.multi]}
                placeholder="Ingredients (name-qty, name-qty)"
                placeholderTextColor="#7D8A95"
                multiline
                value={ingredients}
                onChangeText={setIngredients}
            />

            <TextInput
                style={[styles.input, styles.multi]}
                placeholder="Steps (comma separated)"
                placeholderTextColor="#7D8A95"
                multiline
                value={steps}
                onChangeText={setSteps}
            />

            <TouchableOpacity style={styles.button} onPress={submit}>
                <Text style={styles.btntxt}>Submit</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F6FFFC", // mint white
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 16,
        color: "#2A2A2A", // charcoal
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#D8EAE5", // mint border
        marginBottom: 14,
        fontSize: 15,
        color: "#2A2A2A",
    },

    multi: {
        minHeight: 80,
        textAlignVertical: "top",
    },

    button: {
        backgroundColor: "#2EC4B6", // mint button
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },

    btntxt: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
});
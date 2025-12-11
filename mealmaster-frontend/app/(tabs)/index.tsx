import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

const BASE_URL = "http://192.168.0.120:5000";

interface Ingredient {
    name: string;
    quantity: string;
}

interface Recipe {
    _id: string;
    name: string;
    dietType: string;
    ingredients: Ingredient[];
    image: string;
}

export default function IndexPage() {
    const router = useRouter();

    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [dietFilter, setDietFilter] = useState("");
    const [loading, setLoading] = useState(false);

    const diets = [
        { label: "All", value: "" },
        { label: "Regular", value: "regular" },
        { label: "Vegan", value: "vegan" },
        { label: "Vegetarian", value: "vegetarian" },
        { label: "Keto", value: "keto" },
        { label: "Diabetic", value: "diabetic" },
    ];

    const fetchRecipes = useCallback(async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${BASE_URL}/api/recipes`, {
                params: dietFilter ? { diet: dietFilter } : {},
            });

            setRecipes(res.data);
        } finally {
            setLoading(false);
        }
    }, [dietFilter]);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    const renderCard = ({ item }: { item: Recipe }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
                router.push({
                    pathname: "/recipe/[id]",
                    params: { id: item._id },
                })
            }
        >
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.cardBody}>
                <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.dietType}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>

            {/* LOGO ADDED HERE */}
            <Image
                source={require("@/assets/images/mealmaster-logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>MealMaster</Text>
            <Text style={styles.subtitle}>Smart Recipes • Grocery Planner</Text>

            {/* FILTERS */}
            <View style={styles.filterRow}>
                {diets.map((d) => {
                    const active = d.value === dietFilter;
                    return (
                        <TouchableOpacity
                            key={d.value}
                            style={[styles.filterChip, active && styles.filterChipActive]}
                            onPress={() => setDietFilter(d.value)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    active && styles.filterTextActive,
                                ]}
                            >
                                {d.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {loading && <ActivityIndicator size="small" color="#2EC4B6" />}

            {/* RECIPES GRID */}
            <FlatList
                data={recipes}
                numColumns={2}
                keyExtractor={(item) => item._id}
                renderItem={renderCard}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                scrollEnabled={false}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6FFFC",
        padding: 18,
        paddingTop: 60,
    },

    // LOGO STYLE
    logo: {
        width: 110,
        height: 110,
        alignSelf: "center",
        marginBottom: 12,
    },

    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2A2A2A",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 14,
        color: "#55616D",
        marginBottom: 20,
        textAlign: "center",
    },

    filterRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 20,
    },

    filterChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#E8FBF6",
        marginRight: 8,
        marginBottom: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#D8EAE5",
    },

    filterChipActive: {
        backgroundColor: "#2EC4B6",
        borderColor: "#2EC4B6",
    },

    filterText: {
        color: "#2A2A2A",
    },

    filterTextActive: {
        color: "white",
        fontWeight: "700",
    },

    card: {
        width: "48%",
        backgroundColor: "white",
        borderRadius: 18,
        marginBottom: 18,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#D8EAE5",
    },

    image: {
        width: "100%",
        height: 120,
        backgroundColor: "#D8EAE5",
    },

    cardBody: {
        padding: 10,
    },

    name: {
        fontSize: 15,
        fontWeight: "700",
        color: "#2A2A2A",
    },

    badge: {
        backgroundColor: "#CBF3F0",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 14,
        marginTop: 6,
        alignSelf: "flex-start",
    },

    badgeText: {
        color: "#05676A",
        fontSize: 10,
        textTransform: "capitalize",
        fontWeight: "600",
    },
});
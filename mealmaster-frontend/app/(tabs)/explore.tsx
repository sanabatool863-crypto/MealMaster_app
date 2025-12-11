import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Explore() {
    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            {/* HEADER */}
            <Text style={styles.title}>Explore</Text>
            <Text style={styles.subtitle}>Discover categories & cooking tips</Text>

            {/* CATEGORIES */}
            <Text style={styles.section}>Categories</Text>

            <View style={styles.row}>
                <TouchableOpacity style={styles.catCard} onPress={() => router.push("/(tabs)")}>
                    <Image
                        source={{ uri: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" }}
                        style={styles.catImg}
                    />
                    <Text style={styles.catLabel}>Vegan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.catCard} onPress={() => router.push("/(tabs)")}>
                    <Image
                        source={{ uri: "https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg" }}
                        style={styles.catImg}
                    />
                    <Text style={styles.catLabel}>Protein</Text>
                </TouchableOpacity>
            </View>

            {/* TIPS */}
            <Text style={styles.section}>Tips</Text>

            <View style={styles.tipCard}>
                <Text style={styles.tip}>🥗 Combine protein, veggies & grains for a balanced meal.</Text>
            </View>

            <View style={styles.tipCard}>
                <Text style={styles.tip}>🍳 Cook eggs on low heat for a softer, fluffier texture.</Text>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // PAGE
    container: {
        flex: 1,
        backgroundColor: "#F6FFFC",  // mint white
        padding: 20,
        paddingTop: 60,
    },

    title: {
        fontSize: 32,
        fontWeight: "800",
        color: "#2A2A2A", // charcoal
    },

    subtitle: {
        fontSize: 14,
        color: "#55616D", // soft grey charcoal
        marginBottom: 20,
    },

    // SECTION LABEL
    section: {
        fontSize: 20,
        fontWeight: "700",
        color: "#2A2A2A",
        marginVertical: 12,
    },

    // CATEGORY ROW
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },

    // CATEGORY CARD
    catCard: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#D8EAE5", // mint grey border
    },

    catImg: {
        width: "100%",
        height: 110,
        backgroundColor: "#D8EAE5",
    },

    catLabel: {
        padding: 10,
        fontWeight: "600",
        fontSize: 15,
        color: "#2A2A2A",
    },

    // TIPS BOXES
    tipCard: {
        backgroundColor: "#E8FBF6", // soft mint pastel
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#D8EAE5",
    },

    tip: {
        color: "#2A2A2A",
        fontSize: 14,
    },
});
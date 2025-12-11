import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function Grocery() {
    const items = [
        { name: "Chicken", quantity: "500g" },
        { name: "Spinach", quantity: "1 cup" },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Grocery List</Text>

            <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.qty}>{item.quantity}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyText}>
                            Your grocery list is empty.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6FFFC", // mint white
        padding: 20,
        paddingTop: 60,
    },

    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#2A2A2A", // charcoal
        marginBottom: 14,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: "#D8EAE5", // mint-soft divider
    },

    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2A2A2A",
    },

    qty: {
        fontSize: 14,
        color: "#55616D",
    },

    emptyBox: {
        backgroundColor: "#E8FBF6",
        padding: 16,
        borderRadius: 12,
        marginTop: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D8EAE5",
    },

    emptyText: {
        color: "#2A2A2A",
        fontSize: 14,
    },
});
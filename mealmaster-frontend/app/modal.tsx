import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ModalScreen() {
    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.title}>
                Modal
            </ThemedText>

            <ThemedText style={styles.desc}>
                This is a simple modal window in your app.
            </ThemedText>

            <Link href="/" dismissTo style={styles.button}>
                <ThemedText type="link" style={styles.buttonText}>
                    Go to Home
                </ThemedText>
            </Link>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6FFFC", // mint white
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },

    title: {
        color: "#2A2A2A", // charcoal
        fontWeight: "800",
        fontSize: 28,
        marginBottom: 10,
    },

    desc: {
        color: "#55616D",
        fontSize: 15,
        textAlign: "center",
        marginBottom: 30,
    },

    button: {
        backgroundColor: "#2EC4B6", // mint accent
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 12,
    },

    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
});
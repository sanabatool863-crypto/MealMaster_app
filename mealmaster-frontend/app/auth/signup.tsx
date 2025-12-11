import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        if (!email.trim() || !password.trim()) {
            alert("Please fill all fields");
            return;
        }

        alert("Account created!");
        router.replace("/auth/login");  // Go back to login
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/auth/login")}>
                <Text style={styles.link}>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#F6FFFC",
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 24,
        textAlign: "center",
        color: "#2A2A2A",
    },
    input: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D8EAE5",
        marginBottom: 14,
    },
    button: {
        backgroundColor: "#2EC4B6",
        padding: 16,
        borderRadius: 12,
        marginTop: 10,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: "700",
    },
    link: {
        marginTop: 20,
        textAlign: "center",
        color: "#05676A",
        fontWeight: "600",
    },
});
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { api, setToken } from "@/lib/api";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (email.trim() === "" || password.trim() === "") {
            alert("Please enter email and password");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            alert("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/api/auth/login", { email, password });
            
            if (response.data.token) {
                await setToken(response.data.token);
                router.replace("/(tabs)");
            }
        } catch (error: any) {
            const message = error.response?.data?.message || "Login failed. Please try again.";
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
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

            <TouchableOpacity 
                style={[styles.button, loading && styles.buttonDisabled]} 
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                <Text style={styles.link}>Create an account</Text>
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
    buttonDisabled: {
        opacity: 0.6,
    },
});
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { api } from "@/lib/api";

export default function Signup() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!name.trim() || !email.trim() || !password.trim()) {
            alert("Please fill all fields");
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            alert("Please enter a valid email address");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/api/auth/signup", { name, email, password });
            
            if (response.status === 200 || response.status === 201) {
                alert("Account created successfully!");
                router.replace("/auth/login");
            }
        } catch (error: any) {
            console.error("Signup error:", error);
            
            let message = "Signup failed. Please try again.";
            
            if (error.response) {
                // Server responded with error status
                message = error.response.data?.message || `Server error: ${error.response.status}`;
            } else if (error.request) {
                // Request was made but no response received
                message = "Network error. Please check if the backend server is running.";
            } else {
                // Something else happened
                message = error.message || "An unexpected error occurred.";
            }
            
            alert(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
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
                onPress={handleSignup}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                )}
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
    buttonDisabled: {
        opacity: 0.6,
    },
});
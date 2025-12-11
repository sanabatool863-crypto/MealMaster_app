import { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { getToken } from "@/lib/api";

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = await getToken();
            
            if (token) {
                // User is authenticated, redirect to tabs
                router.replace("/(tabs)");
            } else {
                // User is not authenticated, redirect to login
                router.replace("/auth/login");
            }
        } catch (error) {
            console.error("Error checking auth:", error);
            // On error, redirect to login
            router.replace("/auth/login");
        } finally {
            setLoading(false);
        }
    };

    // Show loading screen while checking authentication
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2EC4B6" />
            </View>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6FFFC",
    },
});


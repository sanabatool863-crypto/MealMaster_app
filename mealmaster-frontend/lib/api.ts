import axios from "axios";
import { BASE_URL } from "../config";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// Auto-detect backend URL based on platform
const getBaseURL = () => {
    // Use the configured BASE_URL for all platforms (now pointing to Vercel)
    return BASE_URL || "https://meal-master-app-6ase.vercel.app";
};

// Web-compatible storage
const getToken = async (): Promise<string | null> => {
    try {
        if (Platform.OS === "web") {
            // Use localStorage for web
            return localStorage.getItem("token");
        } else {
            // Use SecureStore for native
            return await SecureStore.getItemAsync("token");
        }
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
};

const setToken = async (token: string): Promise<void> => {
    try {
        if (Platform.OS === "web") {
            localStorage.setItem("token", token);
        } else {
            await SecureStore.setItemAsync("token", token);
        }
    } catch (error) {
        console.error("Error setting token:", error);
    }
};

const deleteToken = async (): Promise<void> => {
    try {
        if (Platform.OS === "web") {
            localStorage.removeItem("token");
        } else {
            await SecureStore.deleteItemAsync("token");
        }
    } catch (error) {
        console.error("Error deleting token:", error);
    }
};

export const api = axios.create({
    baseURL: getBaseURL(),
});

// Add token to requests if available
api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid, clear it
            await deleteToken();
        }
        return Promise.reject(error);
    }
);

// Export storage functions for use in components
export { getToken, setToken, deleteToken };

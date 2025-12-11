import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                // TAB BAR STYLE
                tabBarStyle: {
                    backgroundColor: "#FFFFFF",      // clean white bar
                    height: 62,
                    borderTopWidth: 1,
                    borderColor: "#D8EAE5",          // mint-soft border
                },

                // ACTIVE / INACTIVE COLORS
                tabBarActiveTintColor: "#2EC4B6",    // mint highlight
                tabBarInactiveTintColor: "#7D8A95",  // cool grey
            }}
        >
            {/* HOME / RECIPES */}
            <Tabs.Screen
                name="index"
                options={{
                    title: "Recipes",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="restaurant-outline" size={22} color={color} />
                    ),
                }}
            />

            {/* EXPLORE */}
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="compass-outline" size={22} color={color} />
                    ),
                }}
            />

            {/* GROCERY */}
            <Tabs.Screen
                name="grocery"
                options={{
                    title: "Grocery",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="list-outline" size={22} color={color} />
                    ),
                }}
            />

            {/* ADD SECTION */}
            <Tabs.Screen
                name="add"
                options={{
                    title: "Add",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="add-circle-outline" size={26} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
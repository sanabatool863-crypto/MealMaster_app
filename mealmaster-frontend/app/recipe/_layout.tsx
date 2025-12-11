import { Stack } from "expo-router";

export default function RecipeLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#F6FFFC", // mint white
                },
                headerTintColor: "#2A2A2A", // charcoal
                headerTitleStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#2A2A2A",
                },
                headerShadowVisible: false,
                title: "Recipe Details",
            }}
        />
    );
}
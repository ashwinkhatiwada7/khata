import { Stack } from "expo-router";

// Default header for every customer screen. Screens redefine the dynamic parts
// (title, headerRight) with their own <Stack.Screen options={...} />.
const headerOptions = {
  headerShown: true,
  // Arrow only: iOS otherwise shows the previous screen's title (customer name).
  headerBackButtonDisplayMode: "minimal" as const,
  headerTintColor: "#5f33e1",
  headerStyle: { backgroundColor: "#ffffff" },
  headerShadowVisible: false,
  headerTitleStyle: { fontWeight: "700" as const },
};

export default function CustomerLayout() {
  return (
    <Stack screenOptions={headerOptions}>
      {/* These screens render their own header UI. */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="search" options={{ headerShown: false }} />

      <Stack.Screen name="[customerId]/index" options={{ title: "Customer" }} />
      <Stack.Screen
        name="[customerId]/edit"
        options={{ title: "Edit Customer" }}
      />
      <Stack.Screen name="create" options={{ title: "New Customer" }} />
    </Stack>
  );
}

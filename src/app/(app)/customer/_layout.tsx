import { Stack } from "expo-router";

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
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          title: "",
        }}
      />
      <Stack.Screen
        name="[customerId]/index"
        options={{ ...headerOptions, title: "Customer" }}
      />
      <Stack.Screen
        name="[customerId]/edit"
        options={{
          ...headerOptions,

          title: "Edit Customer",
        }}
      />
      <Stack.Screen
        name="create"
        options={{ ...headerOptions, title: "New Customer" }}
      />
    </Stack>
  );
}

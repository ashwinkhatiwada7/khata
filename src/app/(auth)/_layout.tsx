import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          headerShadowVisible: false,

          headerTitle: "Sign In",
        }}
      />
      <Stack.Screen
        name="signup"
        // options={{
        //   headerShown: false,
        //   headerTitle: "Sign Up",
        //   headerBackVisible: false,
        //   headerShadowVisible: false,
        // }}
      />
    </Stack>
  );
}

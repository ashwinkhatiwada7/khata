import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { authClient } from "@/lib/authClient";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { data: session, isPending } = authClient.useSession();
  const isLoggedIn = !!session;

  // Gate on the first session check only. isPending also flips to true on a
  // refetch after sign-in/sign-out; returning null then would unmount the
  // stack and make the destination screen flash twice.
  const [ready, setReady] = useState(false);
  if (!isPending && !ready) setReady(true);
  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GluestackUIProvider mode="light">
      {/* Translucent: let the native stack header own the status-bar inset instead of the provider adding a second one. */}
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <RootNavigator />
        </ThemeProvider>
      </KeyboardProvider>
    </GluestackUIProvider>
  );
}

import { Stack } from "expo-router";

// The header is rendered by <HomeHeader /> inside the screen so its spacing is
// identical on iOS and Android (the native Android header sat too low).
export default function HomeLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

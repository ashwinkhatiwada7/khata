import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable } from "react-native";

export function BackButton() {
  return (
    <Pressable
      accessibilityLabel="Go back"
      onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
      className="mb-4 h-11 w-11 items-center justify-center rounded-full bg-white shadow-md active:scale-95"
    >
      <Ionicons name="arrow-back" size={22} color="#0d2e33" />
    </Pressable>
  );
}

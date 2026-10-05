import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

export function HomeHeaderRight() {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Notifications"
      hitSlop={8}
      // TODO: navigate to the notifications screen.
      onPress={() => {}}
      className="h-11 w-11 items-center justify-center rounded-full border border-border bg-card active:opacity-80"
    >
      <Ionicons name="notifications-outline" size={22} color="#24252c" />
    </Pressable>
  );
}

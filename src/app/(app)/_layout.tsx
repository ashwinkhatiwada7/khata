import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import type { ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PRIMARY = "#5f33e1";
const INACTIVE = "#6e6a7c";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function tabIcon(active: IconName, inactive: IconName) {
  return function TabIcon({
    focused,
    color,
  }: {
    focused: boolean;
    color: ColorValue;
  }) {
    return (
      <Ionicons
        name={focused ? active : inactive}
        size={22}
        color={color as string}
      />
    );
  };
}

export default function AppLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: INACTIVE,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarItemStyle: { borderRadius: 16, marginVertical: 6 },
        // Docked bar: grow by the bottom inset so icons stay clear of the
        // Android nav buttons / gesture bar and the iOS home indicator.
        tabBarStyle: {
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingHorizontal: 6,
          backgroundColor: "#ffffff",
          borderTopColor: "#eceaf5",
          borderTopWidth: 1,
          borderRadius: 20,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIcon: tabIcon("home", "home-outline") }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          tabBarIcon: tabIcon("swap-horizontal", "swap-horizontal-outline"),
        }}
      />
      <Tabs.Screen
        name="customer"
        options={{
          title: "Customer",
          tabBarIcon: tabIcon("people", "people-outline"),
        }}
      />
      <Tabs.Screen
        name="reports/index"
        options={{
          title: "Report",
          tabBarIcon: tabIcon("bar-chart", "bar-chart-outline"),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: tabIcon("person-circle", "person-circle-outline"),
        }}
      />
    </Tabs>
  );
}

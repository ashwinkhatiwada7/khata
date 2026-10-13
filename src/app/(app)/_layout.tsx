import TransactionSheet from "@/components/transaction/transaction-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { useState } from "react";
import type { ColorValue } from "react-native";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PRIMARY = "#5f33e1";
const INACTIVE = "#6e6a7c";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

function tabIcon(active: IconName, inactive: IconName, raised: boolean) {
  return function TabIcon({
    focused,
    color,
    size,
  }: {
    focused: boolean;
    color: ColorValue;
    size: number;
  }) {
    if (!raised) {
      return (
        <Ionicons
          name={focused ? active : inactive}
          size={size}
          color={color as string}
        />
      );
    }

    return (
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: PRIMARY,
          alignItems: "center",
          justifyContent: "center",
          marginTop: -28,
          borderWidth: 2,
          borderColor: "#ffffff",
          shadowColor: PRIMARY,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.35,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Ionicons
          color="#ffffff"
          size={32}
          name={focused ? active : inactive}
        />
      </View>
    );
  };
}

export default function AppLayout() {
  const insets = useSafeAreaInsets();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
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
          options={{
            title: "Home",
            tabBarIcon: tabIcon("home", "home-outline", false),
          }}
        />
        <Tabs.Screen
          name="customer"
          options={{
            title: "Customer",

            tabBarIcon: tabIcon("people", "people-outline", false),
          }}
        />{" "}
        <Tabs.Screen
          name="transaction"
          options={{
            tabBarLabel: () => null,
            tabBarStyle: {
              overflow: "visible",
            },
            tabBarIcon: tabIcon("add", "add-outline", true),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault(); // donot navigate
              setIsSheetOpen(true);
            },
          }}
        />
        <Tabs.Screen
          name="reports/index"
          options={{
            title: "Report",
            tabBarIcon: tabIcon("bar-chart", "bar-chart-outline", false),
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarIcon: tabIcon(
              "person-circle",
              "person-circle-outline",
              false,
            ),
          }}
        />
      </Tabs>
      <TransactionSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </>
  );
}

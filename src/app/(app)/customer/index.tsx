import { CustomerRow } from "@/components/customer/customer-row";
import { CUSTOMERS } from "@/components/customer/customers";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Customer() {
  const insets = useSafeAreaInsets();
  // CUSTOMERS is mutated in memory by the create screen; re-read on focus.
  const [data, setData] = useState(CUSTOMERS);
  useFocusEffect(useCallback(() => setData([...CUSTOMERS]), []));

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top + 12 }}
    >
      {/* Fake search bar: tapping opens the dedicated search screen. */}
      <Pressable
        onPress={() => router.push("/customer/search")}
        className="mx-4 mb-3 h-12 flex-row items-center gap-2 rounded-full bg-white px-4 active:opacity-70"
      >
        <Ionicons name="search" size={18} color="#6e6a7c" />
        <Text className="text-base text-[#9b97a8]">
          Search by name or phone
        </Text>
      </Pressable>

      <FlatList
        data={data}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => <CustomerRow item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 96 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
      />

      <Pressable
        onPress={() => router.push("/customer/create")}
        accessibilityLabel="Add customer"
        className="absolute bottom-5 right-5 h-14 w-14 items-center justify-center rounded-full bg-[#5f33e1] shadow-lg active:opacity-80"
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}

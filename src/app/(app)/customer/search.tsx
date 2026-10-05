import { CustomerRow } from "@/components/customer/customer-row";
import { searchCustomers } from "@/components/customer/customers";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomerSearch() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const data = useMemo(() => searchCustomers(query), [query]);

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top + 8 }}
    >
      <View className="mb-3 flex-row items-center gap-1 px-2">
        <Pressable
          onPress={() => router.back()}
          hitSlop={8}
          className="h-11 w-11 items-center justify-center rounded-full active:bg-black/5"
        >
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </Pressable>
        <View className="h-11 flex-1 flex-row items-center gap-2 rounded-full bg-white px-4">
          <TextInput
            autoFocus
            className="h-11 flex-1 text-base text-black"
            placeholder="Search by name or phone"
            placeholderTextColor="#9b97a8"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Ionicons
              name="close-circle"
              size={18}
              color="#9b97a8"
              onPress={() => setQuery("")}
            />
          )}
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => <CustomerRow item={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View className="h-2" />}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <Text className="mt-10 text-center text-gray-500">
            No customers found
          </Text>
        }
      />
    </View>
  );
}

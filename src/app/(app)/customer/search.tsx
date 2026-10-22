import { getAllCustomer } from "@/api/customer";
import { CustomerRow } from "@/components/customer/customer-row";
import { useDebounceCallback } from "@/utils/useDebounceCallback";
import Ionicons from "@expo/vector-icons/Ionicons";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PER_PAGE = 20;

export default function CustomerSearch() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // wait for the user to stop typing before hitting the API
  const applyQuery = useDebounceCallback((text: string) => {
    setDebouncedQuery(text.trim());
  }, 400);

  const onChangeQuery = (text: string) => {
    setQuery(text);
    applyQuery(text);
  };

  const clearQuery = () => {
    applyQuery.cancel();
    setQuery("");
    setDebouncedQuery("");
  };

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["customers", "search", debouncedQuery],
    queryFn: ({ pageParam }) =>
      getAllCustomer(pageParam, PER_PAGE, debouncedQuery),
    initialPageParam: 1,
    getNextPageParam: (last) => {
      const meta = last.meta;
      return meta && meta.page < meta.totalPages ? meta.page + 1 : undefined;
    },
    // keep showing the previous results while a new search loads
    placeholderData: keepPreviousData,
  });

  // dedupe by id in case pages overlap
  const customers = Array.from(
    new Map(
      (data?.pages.flatMap((p) => p.data) ?? []).map((c) => [c.id, c]),
    ).values(),
  );

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
            onChangeText={onChangeQuery}
            autoCorrect={false}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Ionicons
              name="close-circle"
              size={18}
              color="#9b97a8"
              onPress={clearQuery}
            />
          )}
        </View>
      </View>

      {isError && !data ? (
        <View className="items-center gap-3 px-8 pt-10">
          <Text className="text-center text-base text-gray-700">
            {error?.message}
          </Text>
          <Pressable
            onPress={() => refetch()}
            className="rounded-full bg-[#5f33e1] px-6 py-3 active:opacity-80"
          >
            <Text className="font-semibold text-white">Try again</Text>
          </Pressable>
        </View>
      ) : isPending ? (
        <ActivityIndicator className="mt-10" />
      ) : (
        <FlatList
          data={customers}
          keyExtractor={(c) => c.id}
          renderItem={({ item }) => <CustomerRow item={item} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          ItemSeparatorComponent={() => <View className="h-2" />}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator className="py-4" /> : null
          }
          ListEmptyComponent={
            <Text className="mt-10 text-center text-gray-500">
              No customers found
            </Text>
          }
        />
      )}
    </View>
  );
}

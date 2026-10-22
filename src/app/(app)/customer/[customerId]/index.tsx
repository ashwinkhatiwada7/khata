import { getCustomerById, getCustomerTransactions } from "@/api/customer";
import { TransactionRow } from "@/components/customer/transaction-row";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { Customer } from "@/types/customer-types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Pressable,
  RefreshControl,
  View,
} from "react-native";

const BRAND = "#5f33e1";

// meter colour by how much of the limit is used
function meterColor(pct: number) {
  if (pct >= 85) return "#e5484d";
  if (pct >= 60) return "#f5a524";
  return "#2fb344";
}

function formatMoney(n: number) {
  return `Rs. ${n.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export default function CustomerScreen() {
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const [refreshing, setRefreshing] = useState(false);

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["customers", "detail", customerId],
    queryFn: () => getCustomerById({ customerId }),
    enabled: !!customerId,
  });

  // independent of the customer query, so both requests fire in parallel
  const {
    data: txData,
    isPending: txPending,
    isError: txIsError,
    error: txError,
    refetch: txRefetch,
    isRefetching: txRefetching,
  } = useQuery({
    queryKey: ["customers", "detail", customerId, "transactions"],
    queryFn: () => getCustomerTransactions({ customerId }),
    enabled: !!customerId,
  });
  const transactions = txData?.data ?? [];

  // the API may wrap the single customer in an array (like create does)
  const raw: Customer | Customer[] | undefined = data?.data;
  const customer = Array.isArray(raw) ? raw[0] : raw;

  const goEdit = () =>
    router.push({
      pathname: "/customer/[customerId]/edit",
      params: { customerId: customer.id },
    });

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.allSettled([refetch(), txRefetch()]);
    setRefreshing(false);
  };

  const header = (
    <Stack.Screen
      options={{
        title: customer?.name ?? "Customer",
        headerRight: customer
          ? () => (
              <Pressable
                onPress={goEdit}
                hitSlop={8}
                accessibilityLabel="Edit customer"
              >
                <Ionicons name="create-outline" size={22} color={BRAND} />
              </Pressable>
            )
          : undefined,
      }}
    />
  );

  if (isPending) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        {header}
        <ActivityIndicator />
      </View>
    );
  }

  // only block the screen when there is nothing to show; a failed refetch keeps cached data
  if (!customer) {
    return (
      <View className="flex-1 items-center justify-center gap-3 bg-background px-8">
        {header}
        <Ionicons name="alert-circle-outline" size={40} color="#d6336c" />
        <Text className="text-center text-base text-gray-700">
          {error?.message ?? "Customer not found"}
        </Text>
        <Pressable
          onPress={() => refetch()}
          className="rounded-full bg-[#5f33e1] px-6 py-3 active:opacity-80"
        >
          <Text className="font-semibold text-white">Try again</Text>
        </Pressable>
      </View>
    );
  }

  const limit = Number(customer.creditLimit) || 0;
  const used = Number(customer.creditBalance) || 0;
  const available = Math.max(limit - used, 0);
  const rawPct = limit > 0 ? (used / limit) * 100 : used > 0 ? 100 : 0;
  const pct = Math.min(Math.max(rawPct, 0), 100);
  const color = meterColor(pct);
  const settled = used === 0;
  const overLimit = limit > 0 && used > limit;

  return (
    <View className="flex-1 bg-background">
      {header}
      <FlatList
        data={transactions}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <View className="mx-4">
            <TransactionRow item={item} />
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-2" />}
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          txPending ? (
            <ActivityIndicator className="py-8" />
          ) : txIsError ? (
            <View className="mx-4 items-center gap-2 rounded-2xl bg-white p-5">
              <Ionicons name="alert-circle-outline" size={28} color="#d6336c" />
              <Text className="text-center text-sm text-gray-700">
                {txError?.message ?? "Could not load transactions"}
              </Text>
              <Pressable
                onPress={() => txRefetch()}
                className="rounded-full bg-[#5f33e1] px-5 py-2 active:opacity-80"
              >
                <Text className="text-sm font-semibold text-white">
                  {txRefetching ? "Retrying..." : "Try again"}
                </Text>
              </Pressable>
            </View>
          ) : (
            <Text className="py-8 text-center text-sm text-gray-500">
              No transactions yet
            </Text>
          )
        }
        ListHeaderComponent={
          <>
            {/* Profile hero */}
            <LinearGradient
              colors={["#5f33e1", "#8a63f2"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                alignItems: "center",
                paddingTop: 28,
                paddingBottom: 56,
                borderBottomLeftRadius: 32,
                borderBottomRightRadius: 32,
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                gap: 4,
              }}
            >
              <Avatar className="h-20 w-20">
                <AvatarFallbackText>
                  {customer?.name?.charAt(0)}
                </AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
                  }}
                />
              </Avatar>
              <View className="flex flex-col items-start   justify-center ">
                <Text className=" text-2xl font-bold text-white">
                  {customer.name}
                </Text>
                <View className="flex flex-row items-center justify-center">
                  <Ionicons name="location-outline" size={12} color="#fff" />
                  <Text className=" text-xs font-semibold text-white">
                    {customer.address}
                  </Text>
                </View>
                <View className=" mt-2 flex-row items-center gap-2">
                  <Pressable
                    onPress={() => Linking.openURL(`tel:${customer.phone}`)}
                    className="flex-row items-center justify-center gap-1 rounded-full bg-white/20 px-3 py-1 active:opacity-70"
                  >
                    <Ionicons name="call" size={12} color="#fff" />
                    <Text className="text-xs font-semibold text-white">
                      {customer.phone}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </LinearGradient>

            {/* Credit meter card, overlaps the hero */}
            <View className="-mt-8 mx-4 rounded-3xl bg-white p-5 shadow-lg">
              <View className="flex-row items-center justify-between">
                <Text className="text-sm font-semibold text-gray-500">
                  Credit usage
                </Text>
                <View
                  className="rounded-full px-3 py-1"
                  style={{ backgroundColor: `${color}22` }}
                >
                  <Text className="text-xs font-bold" style={{ color }}>
                    {settled
                      ? "Settled"
                      : overLimit
                        ? "Over limit"
                        : `${Math.round(pct)}% used`}
                  </Text>
                </View>
              </View>

              <Text className="mt-2 text-3xl font-extrabold" style={{ color }}>
                {settled ? "Rs. 0" : formatMoney(used)}
              </Text>
              <Text className="text-xs text-gray-500">outstanding balance</Text>

              {/* meter bar with zone ticks */}
              <View className="mt-5 h-4 w-full overflow-hidden rounded-full bg-[#eeeaf8]">
                <View
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </View>
              <View className="mt-1 flex-row justify-between">
                <Text className="text-[10px] text-gray-400">0</Text>
                <Text className="text-[10px] text-gray-400">
                  {formatMoney(limit)}
                </Text>
              </View>

              <View className="mt-4 flex-row gap-3">
                <View className="flex-1 rounded-2xl bg-[#f6f4fc] p-3">
                  <Text className="text-xs text-gray-500">Credit limit</Text>
                  <Text className="mt-1 text-base font-bold text-black">
                    {formatMoney(limit)}
                  </Text>
                </View>
                <View className="flex-1 rounded-2xl bg-[#f6f4fc] p-3">
                  <Text className="text-xs text-gray-500">Available</Text>
                  <Text
                    className="mt-1 text-base font-bold"
                    style={{ color: meterColor(100 - pct < 15 ? 100 : pct) }}
                  >
                    {formatMoney(available)}
                  </Text>
                </View>
              </View>
            </View>

            <Text className="mx-4 mb-2 mt-6 text-base font-bold text-black">
              Transactions
            </Text>

            {/* refresh failed but old rows are still shown */}
            {txIsError && transactions.length > 0 ? (
              <Pressable
                onPress={() => txRefetch()}
                className="mx-4 mb-2 flex-row items-center gap-2 rounded-xl bg-[#fdecef] px-3 py-2 active:opacity-80"
              >
                <Ionicons
                  name="alert-circle-outline"
                  size={16}
                  color="#d6336c"
                />
                <Text className="flex-1 text-xs text-[#d6336c]">
                  {txError?.message ?? "Could not refresh transactions"} · Tap
                  to retry
                </Text>
              </Pressable>
            ) : null}
          </>
        }
      />
    </View>
  );
}

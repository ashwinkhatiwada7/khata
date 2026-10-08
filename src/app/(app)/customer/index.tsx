import { getAllCustomer } from "@/api/customer";
import { CustomerRow } from "@/components/customer/customer-row";
import CustomerListSkeleton from "@/components/customer/skeleton/customerlist-skeleton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Customer() {
  const insets = useSafeAreaInsets();
  // CUSTOMERS is mutated in memory by the create screen; re-read on focus.
  // const [data, setData] = useState(CUSTOMERS);
  // useFocusEffect(useCallback(() => setData([...CUSTOMERS]), []));

  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["customers"],
    queryFn: () => getAllCustomer(),
  });

  // const isSkeleton = false;
  if (isPending) {
    return (
      <View
        className="flex-1 bg-background"
        style={{ paddingTop: insets.top + 12 }}
      >
        <View className="mx-4 mb-3 h-12 rounded-full bg-white" />
        <CustomerListSkeleton />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center gap-3 px-8">
        <Ionicons name="alert-circle-outline" size={40} color="#d6336c" />
        <Text className="text-center text-base text-gray-700">
          {error?.message}
        </Text>
        <Pressable
          onPress={() => refetch()}
          className="rounded-full bg-[#5f33e1] px-6 py-3 active:opacity-80"
        >
          <Text className="font-semibold text-white">
            {isRefetching ? "Retrying..." : "Try again"}
          </Text>
        </Pressable>
      </View>
    );
  }
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
        data={data.data}
        keyExtractor={(c) => c.id}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <Text>No Customer found</Text>
            <Text className="text-xs">Please Create Customer!</Text>
          </View>
        )}
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

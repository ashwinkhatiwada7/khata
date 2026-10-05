import {
  avatarColor,
  CUSTOMERS,
  initials,
} from "@/components/customer/customers";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  router,
  Stack,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function CustomerScreen() {
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const find = () => CUSTOMERS.find((c) => c.id === customerId);
  const [customer, setCustomer] = useState(find);
  // The edit screen mutates CUSTOMERS in place; re-read when returning.
  useFocusEffect(
    useCallback(() => {
      const c = CUSTOMERS.find((x) => x.id === customerId);
      setCustomer(c ? { ...c } : undefined);
    }, [customerId]),
  );

  const goEdit = () =>
    router.push({
      pathname: "/customer/[customerId]/edit",
      params: { customerId },
    });

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen
        options={{
          title: customer?.name ?? "Customer",
          headerTitleStyle: {
            // fontSize: 10,
          },
          headerLeft: () => {},
          headerRight: customer
            ? () => (
                <Pressable
                  onPress={goEdit}
                  hitSlop={8}
                  accessibilityLabel="Edit customer"
                >
                  <Ionicons name="create-outline" size={22} color="#5f33e1" />
                </Pressable>
              )
            : undefined,
        }}
      />

      {!customer ? (
        <Text className="mt-10 text-center text-gray-500">
          Customer not found
        </Text>
      ) : (
        <View className="items-center gap-2 px-6 pt-6">
          <View
            className="h-24 w-24 items-center justify-center rounded-full"
            style={{ backgroundColor: avatarColor(customer.id) }}
          >
            <Text className="text-3xl font-bold text-white">
              {initials(customer.name)}
            </Text>
          </View>
          <Text className="mt-2 text-2xl font-bold text-black">
            {customer.name}
          </Text>
          <Text className="text-base text-gray-500">{customer.phone}</Text>

          <View className="mt-6 w-full items-center rounded-2xl bg-white p-5">
            <Text className="text-sm text-gray-500">Total credit</Text>
            {customer.credit === 0 ? (
              <Text className="mt-1 text-2xl font-bold text-green-600">
                Settled
              </Text>
            ) : (
              <Text className="mt-1 text-2xl font-bold text-red-600">
                Rs. {customer.credit.toLocaleString()}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

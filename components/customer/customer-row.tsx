import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { avatarColor, initials, type Customer } from "./customers";

export function CustomerRow({ item }: { item: Customer }) {
  const settled = item.credit === 0;

  return (
    <Link
      href={{
        pathname: "/customer/[customerId]",
        params: { customerId: item.id },
      }}
      asChild
    >
      <Pressable className="flex-row items-center gap-3 rounded-2xl bg-white p-3 active:opacity-70">
        <View
          className="h-12 w-12 items-center justify-center rounded-full"
          style={{ backgroundColor: avatarColor(item.id) }}
        >
          <Text className="text-base font-bold text-white">
            {initials(item.name)}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-black">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500">{item.phone}</Text>
        </View>
        {settled ? (
          <Text className="text-sm font-semibold text-green-600">Settled</Text>
        ) : (
          <Text className="text-base font-bold text-red-600">
            Rs. {item.credit.toLocaleString()}
          </Text>
        )}
      </Pressable>
    </Link>
  );
}

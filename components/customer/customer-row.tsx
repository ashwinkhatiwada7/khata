import { Customer } from "@/types/customer-types";
import { getRelativeTime } from "@/utils/getRelativeTime";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";

export function CustomerRow({ item }: { item: Customer }) {
  const settled = Number(item.creditLimit) === 0;
  const relativeTime = getRelativeTime(item.updatedAt);
  return (
    <Link
      href={{
        pathname: "/customer/[customerId]",
        params: { customerId: item.id },
      }}
      asChild
    >
      <Pressable
        key={item.id}
        className="flex-row items-center gap-3 rounded-2xl bg-white p-3 active:opacity-70"
      >
        <Avatar>
          <AvatarFallbackText>Jane Doe is test</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            }}
          />
        </Avatar>
        <View className="flex-1">
          <Text className="text-base font-semibold text-black">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500">{item.phone}</Text>
        </View>
        {settled ? (
          <Text className="text-sm font-semibold text-green-600">Settled</Text>
        ) : (
          <View className=" flex flex-col justify-center items-end">
            <Text className="text-base font-bold text-red-600">
              Rs. {item.creditBalance}
            </Text>
            <Text className="text-xs text-muted-foreground">
              {relativeTime}
            </Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

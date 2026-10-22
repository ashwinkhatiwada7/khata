import { Text } from "@/components/ui/text";
import { CustomerTransaction } from "@/types/customer-types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";

const money = (n: string | number) =>
  `Rs. ${Number(n).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
};

export function TransactionRow({ item }: { item: CustomerTransaction }) {
  const isCredit = item.type === "credit";
  const color = isCredit ? "#e5484d" : "#2fb344";

  return (
    <View className="flex-row items-center gap-3 rounded-2xl bg-white p-3">
      <View
        className="h-10 w-10 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1a` }}
      >
        <Ionicons
          name={isCredit ? "arrow-up" : "arrow-down"}
          size={18}
          color={color}
        />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-black">
          {isCredit ? "Credit" : "Payment"}
        </Text>
        <Text className="text-xs text-gray-500" numberOfLines={1}>
          {formatDate(item.date)}
          {item.note ? ` · ${item.note}` : ""}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-sm font-bold" style={{ color }}>
          {money(item.amount)}
        </Text>
        <Text className="text-[10px] text-gray-400">
          Total {money(item.balance)}
        </Text>
      </View>
    </View>
  );
}

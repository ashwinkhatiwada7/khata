import { Ionicons } from "@expo/vector-icons";
import { useFormContext, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { Box } from "../ui/box";
import { transactionSchemaType } from "./schema";

const OPTIONS = [
  {
    value: "credit",
    title: "Credit",
    hint: "Customer took goods, add to their balance",
    icon: "cart-outline",
    color: "#dc2626",
    bg: "bg-red-50",
  },

  {
    value: "payment",
    title: "Payment",
    hint: "Customer paid money, reduce their balance",
    icon: "cash-outline",
    color: "#16a34a",
    bg: "bg-green-50",
  },
] as const;
export default function SelectTransactionType({
  onSelected,
}: {
  onSelected: () => void;
}) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<transactionSchemaType>();
  const customer = useWatch({ control, name: "customer" });
  const type = useWatch({ control, name: "type" });
  return (
    <Box className="gap-2">
      <View className="pr-10 items-center justify-center">
        <Text className="text-lg font-bold text-black">Record Type</Text>
        <Text className="text-sm text-gray-500">
          For {customer?.name ?? "customer"}
        </Text>
      </View>

      <Box className="gap-4">
        {OPTIONS.map((o) => {
          const selected = type === o.value;
          return (
            <Pressable
              key={o.value}
              onPress={() => {
                setValue("type", o.value, { shouldValidate: true });
                onSelected();
              }}
              className={`flex-row items-center gap-3 rounded-2xl border p-4 active:opacity-70 ${
                selected ? "border-[#5f33e1] bg-[#5f33e1]/5" : "border-gray-200"
              }`}
            >
              <View
                className={`h-12 w-12 items-center justify-center rounded-full ${o.bg}`}
              >
                <Ionicons name={o.icon} size={24} color={o.color} />
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold text-black">
                  {o.title}
                </Text>
                <Text className="text-sm text-gray-500">{o.hint}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9b97a8" />
            </Pressable>
          );
        })}
      </Box>
    </Box>
  );
}

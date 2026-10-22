import { Box } from "@/components/ui/box";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function EditCustomer() {
  const { customerId } = useLocalSearchParams<{ customerId: string }>();

  return (
    <Box>
      <Text>cusotmer edit page {customerId}</Text>
    </Box>
  );
}

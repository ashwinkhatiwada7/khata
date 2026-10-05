import { CustomerForm } from "@/components/customer/customer-form";
import { CUSTOMERS, updateCustomer } from "@/components/customer/customers";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditCustomer() {
  const { customerId } = useLocalSearchParams<{ customerId: string }>();
  const customer = CUSTOMERS.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <View className="flex-1 bg-background">
        <Text className="mt-10 text-center text-gray-500">
          Customer not found
        </Text>
      </View>
    );
  }

  return (
    <CustomerForm
      initial={customer}
      submitLabel="Update customer"
      onSubmit={(values) => {
        updateCustomer(customer.id, values);
        router.back();
      }}
    />
  );
}

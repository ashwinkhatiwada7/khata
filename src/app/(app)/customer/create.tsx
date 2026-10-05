import { CustomerForm } from "@/components/customer/customer-form";
import { addCustomer } from "@/components/customer/customers";
import { router } from "expo-router";

export default function CreateCustomer() {
  return (
    <CustomerForm
      submitLabel="Save customer"
      onSubmit={(values) => {
        addCustomer(values);
        router.back();
      }}
    />
  );
}

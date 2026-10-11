import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { View } from "react-native";
import { Button, ButtonText } from "../ui/button";
import CreditForm from "./credit-form";
import PaymentForm from "./payment-form";
import {
  customerSchemaFieldKeys,
  transactionSchema,
  transactionSchemaDefaultValues,
  transactionSchemaType,
  typeSchemaFieldKeys,
} from "./schema";
import SelectCustomer from "./select-customer";
import SelectTransactionType from "./select-transaction-type";

const STEPS = [
  { label: "Customer" },
  { label: "Type" },
  { label: "Details" },
] as const;
const LAST_STEP = STEPS.length - 1;

export default function TransactionForm() {
  const [step, setStep] = useState(0);

  const form = useForm<transactionSchemaType>({
    resolver: zodResolver(transactionSchema),
    defaultValues: transactionSchemaDefaultValues,
  });
  const type = useWatch({ control: form.control, name: "type" });

  async function handleNext() {
    if (step === 0 && !(await form.trigger(customerSchemaFieldKeys))) return;
    if (step === 1 && !(await form.trigger(typeSchemaFieldKeys))) return;
    setStep((s) => s + 1);
  }

  function handleBack() {
    setStep((c) => Math.max(c - 1, 0));
  }
  return (
    <FormProvider {...form}>
      <View className="w-full z-[-2] flex items-center justify-center">
        <View className="mt-2 flex-row gap-1.5">
          {STEPS.map((s, i) => (
            <View
              key={s.label}
              className={`h-1.5  flex-1 rounded-full ${i <= step ? "bg-[#5f33e1]" : "bg-gray-200"}`}
            />
          ))}
        </View>
      </View>
      {step == 0 && <SelectCustomer onSelected={handleNext} />}
      {step == 1 && <SelectTransactionType onSelected={handleNext} />}
      {step == 2 && (type === "payment" ? <PaymentForm /> : <CreditForm />)}

      <View>
        {step > 0 && (
          <Button onPress={handleBack} variant="outline">
            <ButtonText>Back</ButtonText>
          </Button>
        )}
      </View>
    </FormProvider>
  );
}

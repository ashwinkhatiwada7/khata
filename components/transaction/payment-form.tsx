import { createPayment } from "@/api/transaction";
import { ApiError } from "@/lib/client";
import { queryClient } from "@/lib/query-client";
import {
  CreatePaymentPayload,
  CreatePaymentResponse,
} from "@/types/transaction-types";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { Box } from "../ui/box";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { ArrowRightIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { Textarea, TextareaInput } from "../ui/textarea";
import {
  PAYMENT_METHODS,
  paymentFormSchemaFieldKeys,
  transactionSchemaType,
} from "./schema";
const METHOD_LABELS: Record<string, string> = {
  cash: "Cash",
  bankTransfer: "Bank Transfer",
  esewa: "eSewa",
  khalti: "Khalti",
};

export default function PaymentForm({
  onClose,
  onComplete,
}: {
  onClose: () => void;
  onComplete: () => void;
}) {
  const { control, trigger } = useFormContext<transactionSchemaType>();
  const customer = useWatch({ control, name: "customer" });
  const amount = useWatch({ control, name: "amount" });
  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const remark = useWatch({ control, name: "remark" });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    mutate: savePayment,
    isPending,
    error: saveError,
  } = useMutation<CreatePaymentResponse, ApiError, CreatePaymentPayload>({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      onComplete?.();
      setSaveSuccess(true);
    },
    onError: () => {
      onComplete?.();
    },
  });

  const handleSave = async () => {
    if (!(await trigger(paymentFormSchemaFieldKeys))) return;
    savePayment({
      customerId: customer.id,
      amount: amount,
      paymentMethod: paymentMethod,
      remark: remark,
    });
  };

  if (saveSuccess) {
    return (
      <Box className="w-full items-center gap-3 py-10">
        <Ionicons name="checkmark-circle" size={72} color="#16a34a" />
        <Text className="text-lg font-bold">Payment received</Text>
        <Text className="text-center text-gray-600">
          Rs. {Number(amount).toFixed(2)} from {customer?.name}
        </Text>
        <Button className="w-30 mt-10 rounded-2xl" onPress={onClose}>
          <ButtonText>Close</ButtonText>
        </Button>
      </Box>
    );
  }
  if (saveError) {
    if (saveError.status === 422) {
      return (
        <Box className="w-full items-center justify-around gap-10 py-10">
          <Box className="items-center">
            <Ionicons name="alert" size={72} color="#E1AF17" />
            <Text className="text-lg text-warning font-bold">
              Failed to save payment
            </Text>
            <Text className="text-center text-gray-600">
              Rs. {amount} failed for {customer?.name}
            </Text>
            <Text className="text-2xl">{saveError.message}</Text>
          </Box>

          <Button className="w-30 mt-10 rounded-2xl" onPress={onClose}>
            <ButtonText>Close</ButtonText>
          </Button>
        </Box>
      );
    }
    return (
      <Box className="w-full items-center justify-around gap-10 py-10">
        <Box className="items-center">
          <Ionicons name="alert" size={72} color="#F31D0E" />
          <Text className="text-lg text-destructive font-bold">
            Failed to save payment
          </Text>
          <Text className="text-center text-gray-600">
            Rs. {amount} failed for {customer?.name}
          </Text>
          <Text>{saveError.message}</Text>

          <Text>{saveError?.status}</Text>
        </Box>

        <Button className="w-30 mt-10 rounded-2xl" onPress={onClose}>
          <ButtonText>Close</ButtonText>
        </Button>
      </Box>
    );
  }

  return (
    <View className="w-full items-center gap-2 ">
      <Box className=" flex flex-row items-center gap-2">
        {/* <Text className=" text-lg font-bold">Collect payment</Text> */}
        <Avatar>
          <AvatarFallbackText>{customer.name.charAt(0)}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            }}
          />
        </Avatar>
        <Box>
          <Text className="text-lg">{customer.name}</Text>
          <Text className="text-sm text-gray-500">
            Current due: Rs. {customer?.creditBalance ?? "0"}
          </Text>
        </Box>
      </Box>

      <Controller
        control={control}
        name="amount"
        render={({ field, fieldState }) => (
          <Box className="w-full gap-2">
            <Text className="text-xs ">Amount</Text>

            <Input
              className={`h-18 w-full rounded-xl border  px-4 ${fieldState.error ? "border-destructive" : "border-border"} `}
            >
              <InputField
                placeholder="0.00"
                className="text-3xl leading-8 py-0"
                keyboardType="decimal-pad"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                submitBehavior="blurAndSubmit"
              />
            </Input>
            {fieldState.error && (
              <Text className="text-xs text-red-600">
                {fieldState.error.message}
              </Text>
            )}
          </Box>
        )}
      />

      {/* <Controller
        control={control}
        name="paymentMethod"
        render={({ field, fieldState }) => (
          <Box className="w-full gap-2">
            <Text className="text-xs ">Payment Method</Text>
            <Select
              className={`w-full rounded-2xl ${fieldState.error ? "border-destructive" : "border-border"}`}
            >
              <SelectTrigger
                className="flex-row items-center justify-between rounded-2xl"
                variant="outline"
                size="sm"
              >
                <SelectInput
                  className="h-11 flex-1  "
                  placeholder="Select payment method"
                />
                <SelectIcon className="mr-3" as={ChevronsUpDownIcon} />
              </SelectTrigger>
              <SelectPortal useRNModal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {PAYMENT_METHODS.map((method, index) => (
                    <SelectItem
                      key={index}
                      label={method.toUpperCase()}
                      value={method}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </Box>
        )}
      /> */}

      <Controller
        control={control}
        name="paymentMethod"
        render={({ field, fieldState }) => (
          <Box className="w-full gap-2">
            <Text className="text-xs">Payment Method</Text>
            <View className="flex-row flex-wrap gap-2">
              {PAYMENT_METHODS.map((method) => {
                const selected = field.value === method;
                return (
                  <Pressable
                    key={method}
                    onPress={() => field.onChange(method)}
                    accessibilityRole="radio"
                    accessibilityState={{ selected }}
                    className={`rounded-full border px-4 py-2 ${
                      selected
                        ? "border-[#5f33e1] bg-[#5f33e1]"
                        : "border-border bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-sm font-medium ${selected ? "text-white" : "text-gray-700"}`}
                    >
                      {METHOD_LABELS[method] ?? method}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {fieldState.error && (
              <Text className="text-xs text-red-600">
                {fieldState.error.message}
              </Text>
            )}
          </Box>
        )}
      />
      <Controller
        name="remark"
        control={control}
        render={({ field, fieldState }) => (
          <Box className="w-full gap-2">
            <Text className="text-xs">Remark </Text>
            <Textarea size="md" className="w-full rounded-2xl">
              <TextareaInput
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                returnKeyType="done"
                submitBehavior="blurAndSubmit"
                placeholder="Remarks..."
              />
            </Textarea>
            {fieldState.error && (
              <Text className="text-xs text-red-600">
                {fieldState.error.message}
              </Text>
            )}
          </Box>
        )}
      />

      <Button
        onPress={handleSave}
        isDisabled={isPending}
        variant="default"
        disabled={!amount}
        className="w-full mt-4 bg-success h-12 rounded-2xl"
      >
        <ButtonText className=" font-bold">
          {isPending ? "Saving..." : "Save Payment"}
        </ButtonText>
        <ButtonIcon as={ArrowRightIcon} />
      </Button>
    </View>
  );
}

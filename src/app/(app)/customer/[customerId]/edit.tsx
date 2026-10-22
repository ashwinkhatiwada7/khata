import { getCustomerById, updateCustomer } from "@/api/customer";
import {
  updateCustomerSchema,
  updateCustomerSchemaType,
} from "@/components/customer/schema";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { ApiError } from "@/lib/client";
import { queryClient } from "@/lib/query-client";
import {
  Customer,
  UpdateCustomer,
  UpdateCustomerPayload,
} from "@/types/customer-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from "react-native";

export default function EditCustomer() {
  const { customerId } = useLocalSearchParams<{ customerId: string }>();

  // same key as the detail screen, so this is usually served from cache
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["customers", "detail", customerId],
    queryFn: () => getCustomerById({ customerId }),
    enabled: !!customerId,
  });

  // the API may wrap the single customer in an array (like create does)
  const raw: Customer | Customer[] | undefined = data?.data;
  const customer = Array.isArray(raw) ? raw[0] : raw;

  if (isPending) {
    return (
      <Center className="flex-1 bg-background">
        <ActivityIndicator />
      </Center>
    );
  }

  if (!customer) {
    return (
      <Center className="flex-1 bg-background px-6">
        <VStack space="lg" className="items-center">
          <Text className="text-center text-sm text-destructive">
            {error?.message ?? "Customer not found"}
          </Text>
          <Button className="h-12 w-full rounded-xl" onPress={() => refetch()}>
            <ButtonText>Try again</ButtonText>
          </Button>
        </VStack>
      </Center>
    );
  }

  return <EditCustomerForm customer={customer} />;
}

function EditCustomerForm({ customer }: { customer: Customer }) {
  const router = useRouter();

  const {
    mutate: saveCustomer,
    error,
    isPending,
    reset: resetMutation,
  } = useMutation<UpdateCustomer, ApiError, UpdateCustomerPayload>({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.back();
    },
  });

  const initial: updateCustomerSchemaType = {
    customerId: customer.id,
    name: customer.name,
    phone: customer.phone,
    address: customer.address,
    creditLimit: String(customer.creditLimit ?? ""),
  };

  const { control, handleSubmit, setError, formState } =
    useForm<updateCustomerSchemaType>({
      resolver: zodResolver(updateCustomerSchema),
      defaultValues: initial,
      mode: "onTouched",
    });

  function onSubmit(values: updateCustomerSchemaType) {
    if (isPending) return;
    // send only the fields that differ from what the customer already has
    const changed = (
      ["name", "phone", "address", "creditLimit"] as const
    ).filter((k) => values[k] !== initial[k]);
    if (changed.length === 0) return;

    const payload: UpdateCustomerPayload = { customerId: values.customerId };
    for (const k of changed) payload[k] = values[k];

    saveCustomer(payload, {
      onError: (err) => {
        if (err.status === 409) {
          setError("phone", {
            type: "server",
            message: "Customer with this phone number already exists",
          });
        }
      },
    });
  }

  const inputClass = (hasError: boolean) =>
    `h-12 rounded-xl border px-2 ${hasError ? "border-destructive" : "border-border"}`;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        automaticallyAdjustKeyboardInsets
        showsVerticalScrollIndicator={false}
      >
        <VStack space="lg">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Box className="gap-1">
                <Text className="text-xs">Name</Text>
                <Input className={inputClass(!!fieldState.error)}>
                  <InputField
                    placeholder="Customer name"
                    autoCapitalize="words"
                    returnKeyType="next"
                    value={field.value}
                    onChangeText={(t) => {
                      resetMutation();
                      field.onChange(t);
                    }}
                    onBlur={field.onBlur}
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

          <Controller
            control={control}
            name="phone"
            render={({ field, fieldState }) => (
              <Box className="gap-1">
                <Text className="text-xs">Phone</Text>
                <Input className={inputClass(!!fieldState.error)}>
                  <InputField
                    placeholder="98XXXXXXXX"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={field.value}
                    onChangeText={(t) => {
                      resetMutation();
                      field.onChange(t.replace(/\D/g, ""));
                    }}
                    onBlur={field.onBlur}
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

          <Controller
            control={control}
            name="address"
            render={({ field, fieldState }) => (
              <Box className="gap-1">
                <Text className="text-xs">Address</Text>
                <Input className={inputClass(!!fieldState.error)}>
                  <InputField
                    placeholder="Customer address"
                    autoCapitalize="words"
                    returnKeyType="next"
                    value={field.value}
                    onChangeText={(t) => {
                      resetMutation();
                      field.onChange(t);
                    }}
                    onBlur={field.onBlur}
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

          <Controller
            control={control}
            name="creditLimit"
            render={({ field, fieldState }) => (
              <Box className="gap-1">
                <Text className="text-xs">Credit limit</Text>
                <Input className={inputClass(!!fieldState.error)}>
                  <InputField
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                    value={field.value}
                    onChangeText={(t) => {
                      resetMutation();
                      field.onChange(t);
                    }}
                    onBlur={field.onBlur}
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

          {/* non-field failures (network, 5xx); 409 is shown on the phone field */}
          {error && error.status !== 409 && (
            <Text className="text-center text-sm text-destructive">
              {error.message}
            </Text>
          )}

          <Button
            className="mt-2 h-12 rounded-xl"
            isDisabled={isPending || !formState.isDirty}
            onPress={handleSubmit(onSubmit)}
          >
            {isPending && <ButtonSpinner />}
            <ButtonText>{isPending ? "Saving" : "Save changes"}</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

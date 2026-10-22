import { createCustomer } from "@/api/customer";
import {
  createCustomerDefaultValues,
  createCustomerSchema,
  createCustomerType,
} from "@/components/customer/schema";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { ApiError } from "@/lib/client";
import { queryClient } from "@/lib/query-client";
import {
  CreateCustomerPayload,
  CreateCustomerResponse,
} from "@/types/customer-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";

export default function CreateCustomer() {
  const [createSuccess, setCreateSuccess] = useState(false);
  const router = useRouter();
  const {
    mutate: saveCustomer,
    error,
    isPending,
    isSuccess,
    data,
    reset: resetMutation,
  } = useMutation<CreateCustomerResponse, ApiError, CreateCustomerPayload>({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      console.log(data);
    },
  });
  const createdCustomer = data?.data?.[0];
  const { control, handleSubmit, reset, setError } =
    useForm<createCustomerType>({
      resolver: zodResolver(createCustomerSchema),
      defaultValues: { ...createCustomerDefaultValues },
      mode: "onTouched",
    });

  function addAnother() {
    reset();
    resetMutation();
  }

  async function onSubmit(value: createCustomerType) {
    if (isPending) return;
    saveCustomer(value, {
      onError: (error) => {
        if (error instanceof ApiError && error.status === 409) {
          setError("phone", {
            type: "server",
            message: "Customer with this phone number already exists",
          });
        }
      },
    });
  }
  if (isSuccess) {
    return (
      <Center className="flex-1 bg-background px-6">
        <VStack space="md" className="items-center justify-start">
          <Avatar className="h-30 w-30">
            <AvatarFallbackText>
              {createdCustomer?.name?.charAt(0)}
            </AvatarFallbackText>
            {createdCustomer?.image ? (
              <AvatarImage
                source={{
                  uri: `${createdCustomer.image}`,
                }}
              />
            ) : null}
          </Avatar>

          <Text className="text-center text-sm text-muted-foreground">
            {createdCustomer?.name ?? "The customer"} was added successfully.
          </Text>

          <HStack space="lg">
            <Button
              className="h-12 rounded-xl"
              onPress={() => router.replace("/customer")}
            >
              <ButtonText>Done</ButtonText>
            </Button>
            <Button
              variant="default"
              className="h-12  rounded-xl"
              onPress={addAnother}
            >
              <ButtonText>Add another</ButtonText>
            </Button>
          </HStack>
        </VStack>
      </Center>
    );
  }
  if (error) {
    return (
      <Center className="flex-1 bg-background px-6">
        <VStack space="lg" className="items-center">
          <Text className="text-xl font-semibold">Something went wrong</Text>
          <Text className="text-center text-sm text-destructive">
            {error.message}
          </Text>
          <Button
            className="h-12 w-full rounded-xl"
            onPress={() => resetMutation()}
          >
            <ButtonText>Try again</ButtonText>
          </Button>
        </VStack>
      </Center>
    );
  }

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
                <Input
                  className={`h-12 rounded-xl border px-2 ${fieldState.error ? "border-destructive" : "border-border"}`}
                >
                  <InputField
                    placeholder="Customer name"
                    autoCapitalize="words"
                    returnKeyType="next"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    submitBehavior="submit"
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
              <Box className="gap-1 ">
                <Text className="text-xs">Phone</Text>
                <Input
                  className={`h-12 rounded-xl border px-2 ${fieldState.error ? "border-destructive" : "border-border"}`}
                >
                  <InputField
                    placeholder="98XXXXXXXX"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={field.value}
                    onChangeText={(t) => field.onChange(t.replace(/\D/g, ""))}
                    onBlur={field.onBlur}
                    submitBehavior="submit"
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
                <Input
                  className={`h-12 rounded-xl border px-2 ${fieldState.error ? "border-destructive" : "border-border"}`}
                >
                  <InputField
                    placeholder="Customer address"
                    autoCapitalize="words"
                    returnKeyType="next"
                    value={field.value}
                    onChangeText={field.onChange}
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
                <Input
                  className={`h-12 rounded-xl border px-2 ${fieldState.error ? "border-destructive" : "border-border"}`}
                >
                  <InputField
                    placeholder="0.00"
                    keyboardType="decimal-pad"
                    returnKeyType="default"
                    value={field.value}
                    onChangeText={field.onChange}
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

          <Button
            className="mt-2 h-12 rounded-xl"
            isDisabled={isPending}
            onPress={handleSubmit(onSubmit)}
          >
            {isPending && <ButtonSpinner />}
            <ButtonText>{isPending ? "Saving" : "Save"}</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

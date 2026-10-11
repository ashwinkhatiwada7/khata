import { createCredit } from "@/api/transaction";
import { queryClient } from "@/lib/query-client";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Controller,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { FlatList, Pressable, Text, View } from "react-native";
import { Button, ButtonIcon, ButtonText } from "../ui/button";
import { ArrowRightIcon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import {
  CredititemsSchema,
  CredititemsSchemaType,
  EMPTY_CREDIT_ITEM,
  rowTotal,
  transactionSchemaType,
} from "./schema";

export default function CreditForm({ onClose }: { onClose: () => void }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<transactionSchemaType>();
  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = useWatch({ control, name: "items" });
  const customer = useWatch({ control, name: "customer" });
  const draft = useForm<CredititemsSchemaType>({
    resolver: zodResolver(CredititemsSchema),
    defaultValues: EMPTY_CREDIT_ITEM,
  });

  const addItem = draft.handleSubmit((values) => {
    if (!values.name || !values.price || !values.qty) return;
    append(values);
    draft.reset(EMPTY_CREDIT_ITEM);
  });

  const total = (items ?? []).reduce((s, r) => s + rowTotal(r), 0);
  const [saveSucess, setSaveSuccess] = useState(false);
  const {
    mutate: saveCredit,
    isPending,
    error: saveError,
  } = useMutation({
    mutationFn: createCredit,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setSaveSuccess(true);
    },
  });
  const handleSave = () => {
    saveCredit({
      customerId: customer.id,
      items: (items ?? []).map((i) => ({
        name: i.name,
        qty: i.qty,
        price: i.price,
      })),
    });
  };
  if (saveSucess) {
    return (
      <View className="w-full items-center gap-3 py-10">
        <Ionicons name="checkmark-circle" size={72} color="#16a34a" />
        <Text className="text-lg font-bold">Credit added successfully</Text>
        <Text className="text-center text-gray-600">
          Rs. {total.toFixed(2)} added for {customer?.name}
        </Text>
        <Button onPress={onClose}>
          <ButtonText>Close</ButtonText>
        </Button>
      </View>
    );
  }

  return (
    <View className="w-full">
      <View className="gap-3 pb-3">
        <Text className="pr-10 text-lg font-bold">Add credit items</Text>

        <Controller
          control={draft.control}
          name="name"
          render={({ field, fieldState }) => (
            <View>
              <Input
                className={`h-11 rounded-xl border text-base px-4 ${fieldState.error ? "border-destructive" : "border-border"} `}
              >
                <InputField
                  placeholder="Item name"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  returnKeyType="next"
                />
              </Input>
              {fieldState.error && (
                <Text className="text-xs text-red-600">
                  {fieldState.error.message}
                </Text>
              )}
            </View>
          )}
        />

        <View className="flex-row gap-2">
          <Controller
            control={draft.control}
            name="qty"
            render={({ field, fieldState }) => (
              <View className="flex-1">
                <Input
                  className={`h-11 rounded-xl border text-base px-4 ${fieldState.error ? "border-destructive" : "border-border"} `}
                >
                  <InputField
                    placeholder="Qty"
                    keyboardType="decimal-pad"
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
              </View>
            )}
          />
          <Controller
            control={draft.control}
            name="price"
            render={({ field, fieldState }) => (
              <View className="flex-1">
                <Input
                  className={`h-11 rounded-xl border text-base px-4 ${fieldState.error ? "border-destructive" : "border-border"} `}
                >
                  <InputField
                    placeholder="Price"
                    keyboardType="decimal-pad"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    returnKeyType="done"
                    onSubmitEditing={addItem}
                  />
                </Input>
                {fieldState.error && (
                  <Text className="text-xs text-red-600">
                    {fieldState.error.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <Pressable
          onPress={addItem}
          className="items-center rounded-xl bg-[#5f33e1] py-3 active:opacity-80"
        >
          <Text className="font-semibold text-white">+ Add item</Text>
        </Pressable>

        {fields.length > 0 && (
          <Text className="pt-1 text-sm font-semibold text-gray-600">
            Added ({fields.length}) · Rs. {total.toFixed(2)}
          </Text>
        )}
      </View>
      {/* added items list */}
      <FlatList
        data={fields}
        keyExtractor={(f) => f.id}
        style={{
          maxHeight: 300,
        }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListEmptyComponent={() => {
          <View>
            <Text>Add items</Text>
          </View>;
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item, index }) => (
          <View className="flex-row items-center gap-3 rounded-xl bg-gray-50 p-3">
            <View className="flex-1">
              <Text className="font-semibold" numberOfLines={1}>
                {item.name}
              </Text>
              <Text className="text-xs text-gray-500">
                {item.qty} × Rs. {item.price}
              </Text>
            </View>
            <Text className="font-bold">Rs. {rowTotal(item).toFixed(2)}</Text>
            <Pressable onPress={() => remove(index)} hitSlop={8}>
              <Ionicons name="trash-outline" size={18} color="#dc2626" />
            </Pressable>
          </View>
        )}
      />
      {errors.items?.message && (
        <Text className="pt-2 text-xs text-red-600">
          {errors.items.message}
        </Text>
      )}
      {saveError && (
        <Text className="pt-2 text-xs text-red-600">{saveError.message}</Text>
      )}
      {fields.length > 0 && (
        <Button
          onPress={handleSave}
          variant="default"
          disabled={isPending}
          className="w-full h-12 rounded-2xl"
        >
          <ButtonText className="text-xl font-bold ">
            {isPending ? "Saving..." : "Save Credit"}
          </ButtonText>
          <ButtonIcon as={ArrowRightIcon} />
        </Button>
      )}
    </View>
  );
}

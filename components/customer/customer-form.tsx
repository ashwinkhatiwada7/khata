import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import type { Customer } from "./customers";

export type CustomerFormValues = Omit<Customer, "id">;

type Props = {
  initial?: CustomerFormValues;
  submitLabel: string;
  onSubmit: (values: CustomerFormValues) => void;
};

function Field({
  label,
  error,
  ...props
}: React.ComponentProps<typeof TextInput> & { label: string; error?: string }) {
  return (
    <View className="gap-1">
      <Text className="text-sm font-medium text-gray-700">{label}</Text>
      <TextInput
        className={`h-12 rounded-xl border bg-white px-4 text-base text-black ${
          error ? "border-red-500" : "border-[#eceaf5]"
        }`}
        placeholderTextColor="#9b97a8"
        autoCorrect={false}
        {...props}
      />
      {error ? <Text className="text-xs text-red-600">{error}</Text> : null}
    </View>
  );
}

export function CustomerForm({ initial, submitLabel, onSubmit }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [credit, setCredit] = useState(
    initial && initial.credit > 0 ? String(initial.credit) : "",
  );
  const [submitted, setSubmitted] = useState(false);

  const nameError = name.trim() ? undefined : "Name is required";
  const phoneError = /^\d{10}$/.test(phone)
    ? undefined
    : "Enter a 10 digit phone number";
  const creditError =
    credit === "" || /^\d+(\.\d{1,2})?$/.test(credit)
      ? undefined
      : "Enter a valid amount";
  const valid = !nameError && !phoneError && !creditError;

  const onSave = () => {
    setSubmitted(true);
    if (!valid) return;
    onSubmit({
      name: name.trim(),
      phone,
      credit: credit === "" ? 0 : Number(credit),
    });
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Field
          label="Name"
          placeholder="Customer name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          error={submitted ? nameError : undefined}
        />
        <Field
          label="Phone"
          placeholder="98XXXXXXXX"
          value={phone}
          onChangeText={(t) => setPhone(t.replace(/\D/g, "").slice(0, 10))}
          keyboardType="phone-pad"
          error={submitted ? phoneError : undefined}
        />
        <Field
          label="Total credit (optional)"
          placeholder="0"
          value={credit}
          onChangeText={setCredit}
          keyboardType="decimal-pad"
          error={submitted ? creditError : undefined}
        />

        <Pressable
          onPress={onSave}
          className="mt-2 h-12 items-center justify-center rounded-xl bg-[#5f33e1] active:opacity-80"
        >
          <Text className="text-base font-semibold text-white">
            {submitLabel}
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

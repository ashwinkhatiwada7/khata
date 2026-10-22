// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRef } from "react";
// import { Controller, useForm } from "react-hook-form";
// import {
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TextInput,
// } from "react-native";
// import { Box } from "../ui/box";
// import { Button, ButtonSpinner, ButtonText } from "../ui/button";
// import { Input, InputField } from "../ui/input";
// import { Text } from "../ui/text";
// import { VStack } from "../ui/vstack";
// import {
//   createCustomerDefaultValues,
//   createCustomerSchema,
//   createCustomerType,
// } from "./schema";

// type Props = {
//   defaultValues?: Partial<createCustomerType>;
//   submitLabel?: string;
//   isSubmitting?: boolean;
//   onSubmit: (values: createCustomerType) => void | Promise<void>;
// };

// export default function CustomerForm({
//   defaultValues,
//   submitLabel = "Create customer",
//   isSubmitting = false,
//   onSubmit,
// }: Props) {
//   const { control, handleSubmit } = useForm<createCustomerType>({
//     resolver: zodResolver(createCustomerSchema),
//     defaultValues: { ...createCustomerDefaultValues, ...defaultValues },
//     mode: "onTouched",
//   });

//   const phoneRef = useRef<TextInput>(null);
//   const addressRef = useRef<TextInput>(null);
//   const creditRef = useRef<TextInput>(null);

//   return (
//     <KeyboardAvoidingView
//       className="flex-1 bg-background"
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView
//         contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
//         keyboardShouldPersistTaps="handled"
//         keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
//         automaticallyAdjustKeyboardInsets
//         showsVerticalScrollIndicator={false}
//       >
//         <VStack space="lg">
//           <Controller
//             control={control}
//             name="name"
//             render={({ field, fieldState }) => (
//               <Box className="gap-1">
//                 <Text className="text-xs">Name</Text>
//                 <Input
//                   className={`h-12 rounded-xl border px-2 ${fieldState.error ? "border-destructive" : "border-border"}`}
//                 >
//                   <InputField
//                     placeholder="Customer name"
//                     autoCapitalize="words"
//                     returnKeyType="next"
//                     value={field.value}
//                     onChangeText={field.onChange}
//                     onBlur={field.onBlur}
//                     onSubmitEditing={() => phoneRef.current?.focus()}
//                     submitBehavior="submit"
//                   />
//                 </Input>
//                 {fieldState.error && (
//                   <Text className="text-xs text-red-600">
//                     {fieldState.error.message}
//                   </Text>
//                 )}
//               </Box>
//             )}
//           />

//           <Controller
//             control={control}
//             name="phone"
//             render={({ field, fieldState }) => (
//               <Box className="gap-1">
//                 <Text className="text-xs">Phone</Text>
//                 <Input
//                   className={`h-12 rounded-xl border px-2 ${fieldState.error ? "border-destructive" : "border-border"}`}
//                 >
//                   <InputField
//                     ref={phoneRef}
//                     placeholder="98XXXXXXXX"
//                     keyboardType="phone-pad"
//                     maxLength={10}
//                     returnKeyType="next"
//                     value={field.value}
//                     onChangeText={(t) => field.onChange(t.replace(/\D/g, ""))}
//                     onBlur={field.onBlur}
//                     onSubmitEditing={() => addressRef.current?.focus()}
//                     submitBehavior="submit"
//                   />
//                 </Input>
//                 {fieldState.error && (
//                   <Text className="text-xs text-red-600">
//                     {fieldState.error.message}
//                   </Text>
//                 )}
//               </Box>
//             )}
//           />

//           <Controller
//             control={control}
//             name="address"
//             render={({ field, fieldState }) => (
//               <Box className="gap-1">
//                 <Text className="text-xs">Address</Text>
//                 <Input
//                   className={`h-12 rounded-xl border px-2 ${fieldState.error ? "border-destructive" : "border-border"}`}
//                 >
//                   <InputField
//                     ref={addressRef}
//                     placeholder="Customer address"
//                     autoCapitalize="words"
//                     returnKeyType="next"
//                     value={field.value}
//                     onChangeText={field.onChange}
//                     onBlur={field.onBlur}
//                     onSubmitEditing={() => creditRef.current?.focus()}
//                     submitBehavior="submit"
//                   />
//                 </Input>
//                 {fieldState.error && (
//                   <Text className="text-xs text-red-600">
//                     {fieldState.error.message}
//                   </Text>
//                 )}
//               </Box>
//             )}
//           />

//           <Controller
//             control={control}
//             name="creditLimit"
//             render={({ field, fieldState }) => (
//               <Box className="gap-1">
//                 <Text className="text-xs">Credit limit</Text>
//                 <Input
//                   className={`h-12 rounded-xl border px-2 ${fieldState.error ? "border-destructive" : "border-border"}`}
//                 >
//                   <InputField
//                     ref={creditRef}
//                     placeholder="0.00"
//                     keyboardType="decimal-pad"
//                     returnKeyType="done"
//                     value={field.value}
//                     onChangeText={field.onChange}
//                     onBlur={field.onBlur}
//                     onSubmitEditing={handleSubmit(onSubmit)}
//                     submitBehavior="blurAndSubmit"
//                   />
//                 </Input>
//                 {fieldState.error && (
//                   <Text className="text-xs text-red-600">
//                     {fieldState.error.message}
//                   </Text>
//                 )}
//               </Box>
//             )}
//           />

//           <Button
//             className="mt-2 h-12 rounded-xl"
//             isDisabled={isSubmitting}
//             onPress={handleSubmit(onSubmit)}
//           >
//             {isSubmitting && <ButtonSpinner />}
//             <ButtonText>{submitLabel}</ButtonText>
//           </Button>
//         </VStack>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

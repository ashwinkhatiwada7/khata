import {
  signupDefaultValues,
  signupSchema,
  SignupValues,
} from "@/components/auth/schemas";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";
const PLACEHOLDER_COLOR = "#9a96ab";
export default function Signup() {
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: signupDefaultValues,
    reValidateMode: "onSubmit",
  });
  function onSubmit() {}
  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAwareScrollView
        className="flex-1"
        bottomOffset={40}
        contentContainerClassName="grow gap-5 p-6 pb-10"
        keyboardShouldPersistTaps="handled"
      >
        <Box className="gap-1">
          <Text className="text-2xl font-bold text-foreground">
            Welcome back
          </Text>
          <Text className="text-base text-muted-foreground">
            Sign in to continue to Khata.
          </Text>
        </Box>

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Box className="gap-2">
              <Text className="font-bold text-foreground text-sm">Name</Text>
              <Input
                className={`h-14 rounded-2xl border bg-card px-4 text-base text-foreground 
                  ${fieldState.error ? "border-destructive" : "border-border"}`}
              >
                <InputField
                  placeholder="Enter your name"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  autoCapitalize="words"
                  textContentType="name"
                  autoCorrect={false}
                  keyboardType="default"
                  type="text"
                />
              </Input>
              {fieldState.error && (
                <Text className=" text-xs text-destructive">
                  {fieldState.error.message}
                </Text>
              )}
            </Box>
          )}
        />

        <Controller
          name="phone"
          control={form.control}
          render={({ field, fieldState }) => (
            <Box className="gap-2">
              <Text className="font-bold text-foreground text-sm">Phone</Text>
              <Input
                className={`h-14 rounded-2xl border bg-card px-4 text-base text-foreground 
                  ${fieldState.error ? "border-destructive" : "border-border"}`}
              >
                <InputField
                  placeholder="98XXXXXXXX"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  autoCapitalize="none"
                  textContentType="telephoneNumber"
                  autoCorrect={false}
                  keyboardType="phone-pad"
                  type="text"
                />
              </Input>
              {fieldState.error && (
                <Text className=" text-xs text-destructive">
                  {fieldState.error.message}
                </Text>
              )}
            </Box>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Box className="gap-2">
              <Text className="font-bold text-foreground text-sm">Email</Text>
              <Input
                className={`h-14 rounded-2xl border bg-card px-4 text-base text-foreground 
                  ${fieldState.error ? "border-destructive" : "border-border"}`}
              >
                <InputField
                  placeholder="youremail@gmail.com"
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  autoCorrect={false}
                  keyboardType="email-address"
                  type="text"
                />
              </Input>
              {fieldState.error && (
                <Text className=" text-xs text-destructive">
                  {fieldState.error.message}
                </Text>
              )}
            </Box>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Box className="gap-2">
              <Text className="font-bold  text-foreground text-sm">
                Password
              </Text>
              <Input
                className={`h-14 rounded-2xl border bg-card px-4 text-base text-foreground 
                  ${fieldState.error ? "border-destructive" : "border-border"}`}
              >
                <InputField
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoComplete="password"
                />
              </Input>
              {fieldState.error && (
                <Text className=" text-xs text-destructive">
                  {fieldState.error.message}
                </Text>
              )}
            </Box>
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Box className="gap-2">
              <Text className="font-bold  text-foreground text-sm">
                {" "}
                Confirm Password
              </Text>
              <Input
                className={`h-14 rounded-2xl border bg-card px-4 text-base text-foreground 
                  ${fieldState.error ? "border-destructive" : "border-border"}`}
              >
                <InputField
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoComplete="password"
                />
              </Input>
              {fieldState.error && (
                <Text className=" text-xs text-destructive">
                  {fieldState.error.message}
                </Text>
              )}
            </Box>
          )}
        />

        <Button
          onPress={form.handleSubmit(onSubmit)}
          className="mt-2 h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-primary active:opacity-90 disabled:opacity-60"
        >
          <ButtonText>Create account</ButtonText>
        </Button>
        <Box className="flex flex-row gap-2">
          <Text className="text-foreground text-sm ">
            Already have an account?
          </Text>
          <Link href={"/(auth)/login"}>
            <Text className="text-primary">Sign In</Text>
          </Link>
        </Box>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

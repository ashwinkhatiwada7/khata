import { loginSchema, type LoginValues } from "@/components/auth/schemas";
import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/authClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

const PLACEHOLDER_COLOR = "#9a96ab";
// className isn't applied to SafeAreaView / KeyboardAwareScrollView in this
// NativeWind setup, so their layout uses style props.
const SCROLL_CONTENT = {
  flexGrow: 1,
  gap: 20,
  padding: 24,
  paddingBottom: 40,
} as const;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(loginValue: LoginValues) {
    if (isLoading) return;
    try {
      const { data, error } = await authClient.signIn.email({
        email: loginValue.email,
        password: loginValue.password,
      });

      if (error) {
        setErrorMessage(error?.message || "Failed to login");
        return;
      }
    } catch (error) {
      setErrorMessage(
        "Something went wrong! Please check your internet connection",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          bottomOffset={40}
          contentContainerStyle={SCROLL_CONTENT}
          keyboardShouldPersistTaps="handled"
        >
          <View className="gap-1">
            <Text className="text-2xl font-bold text-foreground">
              Welcome back
            </Text>
            <Text className="text-base text-muted-foreground">
              Sign in to continue to Khata.
            </Text>
          </View>

          <View className="gap-1.5">
            <Text className="text-sm font-medium text-foreground">Email</Text>
            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Box>
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="you@example.com"
                    placeholderTextColor={PLACEHOLDER_COLOR}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    returnKeyType="next"
                    submitBehavior="submit"
                    className={`h-14 rounded-2xl border bg-card px-4 text-base text-foreground ${
                      fieldState.error ? "border-destructive" : "border-border"
                    }`}
                  />
                  {fieldState.error ? (
                    <Text className="text-xs text-destructive">
                      {fieldState.error.message}
                    </Text>
                  ) : null}
                </Box>
              )}
            />
          </View>

          <View className="gap-1.5">
            <Text className="text-sm font-medium text-foreground">
              Password
            </Text>
            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Box>
                  <TextInput
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Enter your password"
                    placeholderTextColor={PLACEHOLDER_COLOR}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect={false}
                    textContentType="password"
                    returnKeyType="go"
                    className={`h-14 rounded-2xl border bg-card px-4 text-base text-foreground ${
                      fieldState.error ? "border-destructive" : "border-border"
                    }`}
                  />
                  {fieldState.error ? (
                    <Text className="text-xs text-destructive">
                      {fieldState.error.message}
                    </Text>
                  ) : null}
                </Box>
              )}
            />
          </View>
          {errorMessage && (
            <Text className="text-destructive text-sm">{errorMessage}</Text>
          )}

          <Pressable
            disabled={isLoading}
            onPress={form.handleSubmit(onSubmit)}
            className="mt-2 h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-primary active:opacity-90 disabled:opacity-60"
          >
            {isLoading ? (
              // <ActivityIndicator color="#ffffff" />
              <Spinner />
            ) : (
              <Text className="text-lg font-semibold text-primary-foreground">
                Sign In
              </Text>
            )}
          </Pressable>

          <View className="flex flex-row">
            <Text> Don&apos;t have an account?</Text>
            <Link href="/(auth)/signup">
              <Text className="text-primary">Create account</Text>
            </Link>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
}

import { loginSchema, type LoginValues } from "@/components/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
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
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(() => console.log("signedb in"));

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
              control={control}
              name="email"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
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
                    errors.email ? "border-destructive" : "border-border"
                  }`}
                />
              )}
            />
            {errors.email ? (
              <Text className="text-xs text-destructive">
                {errors.email.message}
              </Text>
            ) : null}
          </View>

          <View className="gap-1.5">
            <Text className="text-sm font-medium text-foreground">
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your password"
                  placeholderTextColor={PLACEHOLDER_COLOR}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect={false}
                  textContentType="password"
                  returnKeyType="go"
                  onSubmitEditing={onSubmit}
                  className={`h-14 rounded-2xl border bg-card px-4 text-base text-foreground ${
                    errors.password ? "border-destructive" : "border-border"
                  }`}
                />
              )}
            />
            {errors.password ? (
              <Text className="text-xs text-destructive">
                {errors.password.message}
              </Text>
            ) : null}
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={isSubmitting}
            onPress={onSubmit}
            className="mt-2 h-14 flex-row items-center justify-center gap-2 rounded-2xl bg-primary active:opacity-90 disabled:opacity-60"
          >
            {isSubmitting ? <ActivityIndicator color="#ffffff" /> : null}
            <Text className="text-lg font-semibold text-primary-foreground">
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Text>
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

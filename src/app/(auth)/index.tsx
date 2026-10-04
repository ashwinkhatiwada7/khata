import AppLogo from "@/assets/expo.icon/Assets/logo.png";
import { Image } from "@/components/ui/image";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  const router = useRouter();
  return (
    <View className="flex-1 bg-background">
      <SafeAreaView style={{ flex: 1 }}>
        <View className="flex-1 px-6 pb-6">
          <View className=" flex-1 items-center justify-center  gap-3">
            <View className="">
              <Image size="2xl" source={AppLogo} alt="Khata logo" />
            </View>
            <Text className="text-xl font-bold text-foreground">
              Welcome to Khata
            </Text>
            <Text className="max-w-70 text-center text-base text-muted-foreground">
              Manage your store&apos;s accounts in one place.
            </Text>
          </View>

          <View className="shrink-0  gap-3">
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/signup")}
              className="h-14 items-center justify-center rounded-2xl bg-primary active:opacity-90"
            >
              <Text className="text-lg font-semibold text-primary-foreground">
                Create an account
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/login")}
              className="h-14 items-center justify-center rounded-2xl border border-border bg-card active:opacity-90"
            >
              <Text className="text-lg font-semibold text-foreground">
                Sign In
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

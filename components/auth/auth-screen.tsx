import { ScrollView, KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Shared shell for every auth form. Keeps inputs visible above the keyboard:
 * KeyboardAvoidingView pads/shrinks the layout, the ScrollView lets the focused
 * field scroll into view, and taps outside inputs still reach buttons/links.
 */
export function AuthScreen({ children, header }: { children: React.ReactNode; header?: React.ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-brand-surface" edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow px-5 pb-8"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
          automaticallyAdjustKeyboardInsets={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="w-full max-w-[440px] flex-1 self-center pt-4">
            {header}
            {children}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

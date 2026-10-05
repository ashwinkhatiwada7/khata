import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HomeHeaderLeft } from "./home-header-left";
import { HomeHeaderRight } from "./home-header-right";

export function HomeHeader() {
  // Hook insets instead of SafeAreaView: className isn't applied to it here.
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-row items-center justify-between bg-background px-6 pb-3"
      style={{ paddingTop: insets.top + 8 }}
    >
      <HomeHeaderLeft />
      <HomeHeaderRight />
    </View>
  );
}

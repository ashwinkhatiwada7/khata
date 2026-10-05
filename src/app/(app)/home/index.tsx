import { HomeHeader } from "@/components/home/home-header";
import { ScrollView, Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-background">
      <HomeHeader />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, gap: 20 }}
      >
        <Text>hi</Text>
      </ScrollView>
    </View>
  );
}

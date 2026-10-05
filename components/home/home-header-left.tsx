import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Text, View } from "react-native";

// TODO: replace with the Better Auth session user (authClient.useSession()).
const USER_NAME = "Ashwin Khatiwada";

export function HomeHeaderLeft() {
  return (
    <View className="flex-row items-center gap-3 p-2">
      <Avatar>
        <AvatarFallbackText>{USER_NAME}</AvatarFallbackText>
      </Avatar>
      <View>
        <Text className="text-sm text-muted-foreground">Welcome back</Text>
        <Text className="text-sm font-bold text-foreground">{USER_NAME}</Text>
      </View>
    </View>
  );
}

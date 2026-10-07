import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { authClient } from "@/lib/authClient";

export default function Profile() {
  async function Logout() {
    try {
      await authClient.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box className="flex-1 justify-end pb-20 px-10">
      <Text>Profile page</Text>
      <Button onPress={() => Logout()} variant="destructive" size="default">
        <ButtonText className="font-bold text-xl">Logout</ButtonText>
      </Button>
    </Box>
  );
}

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth";

export default function Reports() {
  const { signOut } = useAuth();
  return (
    <Box>
      <Text>reports page</Text>
    </Box>
  );
}

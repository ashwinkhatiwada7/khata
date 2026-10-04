import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/providers/auth";

export default function Home() {
  const { signOut } = useAuth();
  return (
    <Box>
      <Text>home page</Text>
    </Box>
  );
}

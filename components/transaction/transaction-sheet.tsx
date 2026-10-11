import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
} from "../ui/actionsheet";
import { Box } from "../ui/box";
import { transactionSchema, transactionSchemaType } from "./schema";
import TransactionForm from "./transaction-form";

export default function TransactionSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const form = useForm<transactionSchemaType>({
    resolver: zodResolver(transactionSchema),
  });
  return (
    <Actionsheet
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      className=""
      useRNModal
    >
      <ActionsheetBackdrop />
      <ActionsheetContent
        style={{
          paddingBottom: insets.bottom + 12,
          borderRadius: 10,
        }}
        className="pb-0 rounded-t-4xl"
      >
        {/* <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator className=" bg-black w-10 h-2" />
        </ActionsheetDragIndicatorWrapper> */}
        <Box className="min-h-400 w-full">
          <Pressable
            onPress={onClose}
            className=" absolute top-[-10] right-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
          >
            <Ionicons name="close-outline" size={28} />
          </Pressable>

          <TransactionForm onClose={onClose} />
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
}

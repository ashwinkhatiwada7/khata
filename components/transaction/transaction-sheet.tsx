import { Ionicons } from "@expo/vector-icons";
import { Pressable, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "../ui/actionsheet";
import { Box } from "../ui/box";
import TransactionForm from "./transaction-form";

export default function TransactionSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { top, bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  return (
    <Actionsheet
      closeOnOverlayClick={true}
      isOpen={isOpen}
      onClose={onClose}
      useRNModal
    >
      <ActionsheetBackdrop />
      <ActionsheetContent
        style={{
          height: height - top,
          maxHeight: height - top,
          minHeight: height - top,
          paddingBottom: bottom + 12,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        className="pb-0 rounded-t-4xl"
      >
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator className=" bg-black w-10 h-2" />
        </ActionsheetDragIndicatorWrapper>
        <Box className=" w-full">
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

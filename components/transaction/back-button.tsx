import { View } from "react-native";
import { Button, ButtonText } from "../ui/button";

export default function BackButton({
  step,
  handleBack,
}: {
  step: number;
  handleBack: () => void;
}) {
  return (
    <View>
      {step > 0 && (
        <Button onPress={handleBack} variant="outline">
          <ButtonText>Back</ButtonText>
        </Button>
      )}
    </View>
  );
}

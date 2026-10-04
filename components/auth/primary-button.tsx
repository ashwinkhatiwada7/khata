import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "solid" | "outline";
  icon?: React.ComponentProps<typeof Ionicons>["name"];
};

export function PrimaryButton({ label, onPress, loading, variant = "solid", icon }: Props) {
  const solid = variant === "solid";
  return (
    <Button
      onPress={onPress}
      isDisabled={loading}
      className={
        solid
          ? "h-14 rounded-2xl bg-brand shadow-lg data-[active=true]:scale-[0.98] data-[active=true]:bg-brand-ink"
          : "h-14 rounded-2xl border border-brand/20 bg-white shadow-sm data-[active=true]:scale-[0.98] data-[active=true]:bg-brand-field"
      }
    >
      {loading ? <ButtonSpinner color={solid ? "#fff" : "#0d2e33"} /> : null}
      <ButtonText className={solid ? "text-base font-bold text-white" : "text-base font-bold text-brand"}>
        {loading ? "Please wait..." : label}
      </ButtonText>
      {!loading && icon ? <Ionicons name={icon} size={19} color={solid ? "#7fd0ff" : "#00658b"} /> : null}
    </Button>
  );
}

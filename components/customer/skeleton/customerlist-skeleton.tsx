import { Skeleton } from "@/components/ui/skeleton";
import { ScrollView, View } from "react-native";

const ROWS = 12; // enough to fill a screen; 20 offscreen rows are wasted work

export default function CustomerListSkeleton() {
  return (
    <ScrollView>
      <View className="gap-2 px-4" accessibilityLabel="Loading customers">
        {Array.from({ length: ROWS }).map((_, i) => (
          <View
            key={i}
            className="flex-row items-center gap-3 rounded-2xl bg-white p-3"
          >
            {/* avatar */}
            <Skeleton className="h-12 w-12 rounded-full" />

            {/* name + phone */}
            <View className="flex-1 gap-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-3 w-24 rounded" />
            </View>

            {/* amount */}
            <Skeleton className="h-5 w-16 rounded" />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

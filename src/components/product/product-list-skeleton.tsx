import { View } from "react-native";
import { Skeleton } from "../ui/skeleton";
import { VStack } from "../ui/vstack";

function SkeletonCard() {
  return (
    <View className="flex-row gap-3 p-4 border border-border rounded-lg mb-3">
      <Skeleton className="w-20 h-20 rounded-md" />
      <VStack className="flex-1" space="sm">
        <Skeleton className="h-4 w-3/4 rounded" />
        <Skeleton className="h-3 w-1/2 rounded" />
        <Skeleton className="h-3 w-1/4 rounded" />
        <View className="flex-row gap-2 mt-1">
          <Skeleton className="h-7 w-16 rounded" />
          <Skeleton className="h-7 w-16 rounded" />
          <Skeleton className="h-7 w-16 rounded" />
        </View>
      </VStack>
    </View>
  );
}

export default function ProductListSkeleton() {
  return (
    <VStack>
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </VStack>
  );
}

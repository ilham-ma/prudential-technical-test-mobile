import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { EditIcon, Icon } from "../../components/ui/icon";
import { Skeleton, SkeletonText } from "../../components/ui/skeleton";
import { Text } from "../../components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "../../components/ui/toast";
import { productService_getDetail } from "../../services/product.service";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const toast = useToast();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService_getDetail(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      const message =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message ??
        "Failed to load product.";
      toast.show({
        placement: "top",
        duration: 4000,
        render: ({ id: toastId }) => (
          <Toast nativeID={`toast-${toastId}`} variant="solid" action="error">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </Toast>
        ),
      });
    }
  }, [isError]);

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {isPending ? (
          <View>
            <Skeleton className="w-full h-64 rounded-xl mb-4" />
            <SkeletonText _lines={1} className="h-6 w-3/4 mb-2" />
            <SkeletonText _lines={1} className="h-5 w-1/4 mb-4" />
            <SkeletonText _lines={4} className="h-4 w-full" />
          </View>
        ) : isError ? (
          <View className="items-center py-8">
            <Text className="text-muted-foreground mb-4">Failed to load product.</Text>
            <Button variant="outline" onPress={() => router.back()}>
              <ButtonText>Go Back</ButtonText>
            </Button>
          </View>
        ) : data ? (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
            >
              {(data.images.length > 0 ? data.images : [data.thumbnail]).map(
                (img, idx) => (
                  <Image
                    key={idx}
                    source={{ uri: img }}
                    style={{
                      width: 280,
                      height: 220,
                      borderRadius: 12,
                      marginRight: 12,
                    }}
                    contentFit="cover"
                  />
                ),
              )}
            </ScrollView>

            <Card className="p-5">
              <Text className="text-2xl font-bold text-foreground mb-1">
                {data.title}
              </Text>

              <View className="flex-row items-center gap-4 mb-3">
                <Text className="text-primary text-xl font-bold">
                  ${data.price.toFixed(2)}
                </Text>
                {data.discountPercentage > 0 && (
                  <Text className="text-destructive text-sm">
                    -{data.discountPercentage.toFixed(0)}%
                  </Text>
                )}
              </View>

              <View className="flex-row flex-wrap gap-x-6 gap-y-1 mb-4">
                <Text className="text-muted-foreground text-sm">
                  Rating: <Text className="text-foreground font-medium">{data.rating}</Text>
                </Text>
                <Text className="text-muted-foreground text-sm">
                  Stock: <Text className="text-foreground font-medium">{data.stock}</Text>
                </Text>
                {data.brand && (
                  <Text className="text-muted-foreground text-sm">
                    Brand: <Text className="text-foreground font-medium">{data.brand}</Text>
                  </Text>
                )}
                <Text className="text-muted-foreground text-sm">
                  Category: <Text className="text-foreground font-medium">{data.category}</Text>
                </Text>
              </View>

              <Text className="text-foreground/80 leading-relaxed mb-6">
                {data.description}
              </Text>

              <Button
                onPress={() => router.push(`/product/edit/${id}`)}
                className="flex-row gap-2"
              >
                <Icon as={EditIcon} size="sm" className="text-primary-foreground" />
                <ButtonText>Edit Product</ButtonText>
              </Button>
            </Card>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

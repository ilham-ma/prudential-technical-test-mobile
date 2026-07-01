import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../../components/product/product-card";
import ProductListSkeleton from "../../components/product/product-list-skeleton";
import SearchBar from "../../components/product/search-bar";
import { Button, ButtonText } from "../../components/ui/button";
import { Heading } from "../../components/ui/heading";
import { Text } from "../../components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "../../components/ui/toast";
import { IProduct } from "../../interfaces/product/product.interface";
import { IProductListResponse } from "../../interfaces/product/product-list-response.interface";
import {
  productService_delete,
  productService_getList,
} from "../../services/product.service";

const LIMIT = 10;

export default function HomeScreen() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", { q: debouncedQuery }],
    queryFn: ({ pageParam = 0 }) =>
      productService_getList({ limit: LIMIT, skip: pageParam as number, q: debouncedQuery || undefined }),
    getNextPageParam: (last: IProductListResponse) =>
      last.skip + last.limit < last.total ? last.skip + last.limit : undefined,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (isError) {
      const message =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message ??
        "Failed to load products. Please try again.";
      toast.show({
        placement: "top",
        duration: 4000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} variant="solid" action="error">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </Toast>
        ),
      });
    }
  }, [isError]);

  const deleteMutation = useMutation({
    mutationFn: productService_delete,
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        ["products", { q: debouncedQuery }],
        (old: { pages: IProductListResponse[]; pageParams: unknown[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              products: page.products.filter((p: IProduct) => p.id !== id),
            })),
          };
        },
      );
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id: toastId }) => (
          <Toast nativeID={`toast-${toastId}`} variant="solid" action="success">
            <ToastTitle>Deleted</ToastTitle>
            <ToastDescription>Product deleted successfully.</ToastDescription>
          </Toast>
        ),
      });
    },
    onError: () => {
      toast.show({
        placement: "top",
        duration: 4000,
        render: ({ id: toastId }) => (
          <Toast nativeID={`toast-${toastId}`} variant="solid" action="error">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>Failed to delete product.</ToastDescription>
          </Toast>
        ),
      });
    },
  });

  const products = data?.pages.flatMap((p) => p.products) ?? [];

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
        ListHeaderComponent={
          <View>
            <Heading className="text-2xl mb-4">Products</Heading>
            <SearchBar
              value={query}
              onChangeText={setQuery}
              onDebouncedChange={setDebouncedQuery}
            />
          </View>
        }
        ListEmptyComponent={
          isPending ? (
            <ProductListSkeleton />
          ) : isError ? (
            <View className="items-center py-8">
              <Text className="text-muted-foreground mb-4">Failed to load products.</Text>
              <Button variant="outline" onPress={() => refetch()}>
                <ButtonText>Retry</ButtonText>
              </Button>
            </View>
          ) : (
            <View className="items-center py-8">
              <Text className="text-muted-foreground">No products found.</Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onDetail={() => router.push(`/product/${item.id}`)}
            onEdit={() => router.push(`/product/edit/${item.id}`)}
            onDelete={() => deleteMutation.mutate(item.id)}
          />
        )}
        ListFooterComponent={
          products.length === 0 ? null : isFetchingNextPage ? (
            <View className="py-4 items-center">
              <ActivityIndicator />
            </View>
          ) : hasNextPage ? (
            <Button
              variant="outline"
              className="mx-4 mb-4"
              onPress={() => fetchNextPage()}
            >
              <ButtonText>Load More</ButtonText>
            </Button>
          ) : (
            <View className="py-4 items-center">
              <Text className="text-muted-foreground text-sm">No more products</Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
}

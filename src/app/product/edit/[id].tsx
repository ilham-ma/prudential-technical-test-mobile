import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductForm from "../../../components/product/product-form";
import { ProductFormValues } from "../../../components/product/product-form/schema";
import { Text } from "../../../components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "../../../components/ui/toast";
import { IProduct } from "../../../interfaces/product/product.interface";
import { IProductListResponse } from "../../../interfaces/product/product-list-response.interface";
import {
  productService_edit,
  productService_getDetail,
} from "../../../services/product.service";

export default function EditProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService_getDetail(Number(id)),
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) {
      toast.show({
        placement: "top",
        duration: 4000,
        render: ({ id: toastId }) => (
          <Toast nativeID={`toast-${toastId}`} variant="solid" action="error">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>Failed to load product data.</ToastDescription>
          </Toast>
        ),
      });
    }
  }, [isError]);

  const { mutate, isPending: isSaving } = useMutation({
    mutationFn: (values: ProductFormValues) =>
      productService_edit(Number(id), {
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        brand: values.brand,
        stock: values.stock,
        thumbnail: values.thumbnail || undefined,
      }),
    onSuccess: (updated: IProduct) => {
      queryClient.setQueryData(["product", id], updated);

      queryClient.setQueriesData(
        { queryKey: ["products"] },
        (old: { pages: IProductListResponse[]; pageParams: unknown[] } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              products: page.products.map((p: IProduct) =>
                p.id === updated.id ? { ...p, ...updated } : p,
              ),
            })),
          };
        },
      );

      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id: toastId }) => (
          <Toast nativeID={`toast-${toastId}`} variant="solid" action="success">
            <ToastTitle>Updated</ToastTitle>
            <ToastDescription>Product updated successfully.</ToastDescription>
          </Toast>
        ),
      });
      router.back();
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      const message =
        err?.response?.data?.message ?? "Failed to update product.";
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
    },
  });

  if (isPending) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (isError || !data) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-muted-foreground">Failed to load product.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" edges={["bottom"]}>
      <View className="flex-1 px-6 pt-4">
        <ProductForm
          defaultValues={{
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            brand: data.brand ?? "",
            stock: data.stock,
            thumbnail: data.thumbnail ?? "",
          }}
          submitLabel="Save Changes"
          isSubmitting={isSaving}
          onSubmit={(values) => mutate(values)}
        />
      </View>
    </SafeAreaView>
  );
}

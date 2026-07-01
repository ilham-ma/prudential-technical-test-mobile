import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductForm from "../../components/product/product-form";
import { ProductFormValues } from "../../components/product/product-form/schema";
import { Heading } from "../../components/ui/heading";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "../../components/ui/toast";
import { IProductListResponse } from "../../interfaces/product/product-list-response.interface";
import { IProduct } from "../../interfaces/product/product.interface";
import { productService_add } from "../../services/product.service";

export default function AddProductScreen() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: ProductFormValues) =>
      productService_add({
        title: values.title,
        description: values.description,
        price: values.price,
        category: values.category,
        brand: values.brand,
        stock: values.stock,
        thumbnail: values.thumbnail || undefined,
      }),
    onSuccess: (newProduct: IProduct) => {
      queryClient.setQueryData(
        ["products", { q: "" }],
        (
          old:
            | { pages: IProductListResponse[]; pageParams: unknown[] }
            | undefined,
        ) => {
          if (!old) return old;
          const [firstPage, ...rest] = old.pages;
          return {
            ...old,
            pages: [
              { ...firstPage, products: [newProduct, ...firstPage.products] },
              ...rest,
            ],
          };
        },
      );
      toast.show({
        placement: "top",
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} variant="solid" action="success">
            <ToastTitle>Added</ToastTitle>
            <ToastDescription>Product added successfully.</ToastDescription>
          </Toast>
        ),
      });
      router.replace("/(tabs)");
    },
    onError: () => {
      toast.show({
        placement: "top",
        duration: 4000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} variant="solid" action="error">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>
              Failed to add product. Please try again.
            </ToastDescription>
          </Toast>
        ),
      });
    },
  });

  return (
    <SafeAreaView>
      <View className="px-6 py-4">
        <Heading className="text-2xl mb-6">Add Product</Heading>
        <ProductForm
          submitLabel="Add Product"
          isSubmitting={isPending}
          onSubmit={(values) => mutate(values)}
        />
      </View>
    </SafeAreaView>
  );
}

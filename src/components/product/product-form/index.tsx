import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { Button, ButtonText } from "../../ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../../ui/form-control";
import { Input, InputField } from "../../ui/input";
import { VStack } from "../../ui/vstack";
import { ProductFormValues, productFormSchema } from "./schema";

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (data: ProductFormValues) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export default function ProductForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  submitLabel = "Submit",
}: ProductFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      brand: "",
      stock: 0,
      thumbnail: "",
      ...defaultValues,
    },
    mode: "onTouched",
  });

  const fields: {
    name: keyof ProductFormValues;
    label: string;
    placeholder: string;
    keyboardType?: "default" | "numeric" | "url";
    multiline?: boolean;
  }[] = [
    { name: "title", label: "Title", placeholder: "Product title" },
    {
      name: "description",
      label: "Description",
      placeholder: "Product description",
      multiline: true,
    },
    {
      name: "price",
      label: "Price",
      placeholder: "0.00",
      keyboardType: "numeric",
    },
    { name: "category", label: "Category", placeholder: "e.g. beauty" },
    { name: "brand", label: "Brand (optional)", placeholder: "Brand name" },
    {
      name: "stock",
      label: "Stock",
      placeholder: "0",
      keyboardType: "numeric",
    },
    {
      name: "thumbnail",
      label: "Thumbnail URL (optional)",
      placeholder: "https://...",
      keyboardType: "url",
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack space="lg" className="pb-8">
        {fields.map((f) => (
          <FormControl key={f.name} isInvalid={!!errors[f.name]}>
            <FormControlLabel>
              <FormControlLabelText>{f.label}</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name={f.name}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input className={f.multiline ? "h-24 items-start py-2" : ""}>
                  <InputField
                    placeholder={f.placeholder}
                    keyboardType={f.keyboardType ?? "default"}
                    multiline={f.multiline}
                    numberOfLines={f.multiline ? 4 : 1}
                    autoCapitalize="none"
                    value={String(value ?? "")}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    className={f.multiline ? "h-full" : ""}
                  />
                </Input>
              )}
            />
            {errors[f.name] && (
              <FormControlError>
                <FormControlErrorText>
                  {errors[f.name]?.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        ))}

        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="mt-2"
        >
          <ButtonText>{isSubmitting ? "Saving..." : submitLabel}</ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  );
}

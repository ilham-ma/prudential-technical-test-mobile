import { Image } from "expo-image";
import { Alert, Pressable, View } from "react-native";
import { IProduct } from "../../interfaces/product/product.interface";
import { Button, ButtonText } from "../ui/button";
import { EditIcon, EyeIcon, Icon, TrashIcon } from "../ui/icon";
import { Text } from "../ui/text";

interface ProductCardProps {
  product: IProduct;
  onDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({
  product,
  onDetail,
  onEdit,
  onDelete,
}: ProductCardProps) {
  function confirmDelete() {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${product.title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete },
      ],
    );
  }

  return (
    <View className="flex-row gap-3 p-4 border border-border rounded-lg mb-3 bg-card">
      <Image
        source={{ uri: product.thumbnail }}
        style={{ width: 80, height: 80, borderRadius: 8 }}
        contentFit="cover"
      />
      <View className="flex-1">
        <Text className="font-semibold text-foreground" numberOfLines={2}>
          {product.title}
        </Text>
        <Text className="text-primary font-bold mt-0.5">
          ${product.price.toFixed(2)}
        </Text>
        <Text className="text-muted-foreground text-xs mt-0.5">
          Rating: {product.rating} | Stock: {product.stock}
        </Text>
        <View className="flex-row gap-2 mt-2">
          <Button size="sm" variant="outline" onPress={onDetail} className="flex-row gap-1">
            <Icon as={EyeIcon} size="xs" />
            <ButtonText>Detail</ButtonText>
          </Button>
          <Button size="sm" variant="secondary" onPress={onEdit} className="flex-row gap-1">
            <Icon as={EditIcon} size="xs" />
            <ButtonText>Edit</ButtonText>
          </Button>
          <Button size="sm" variant="destructive" onPress={confirmDelete} className="flex-row gap-1">
            <Icon as={TrashIcon} size="xs" className="text-white" />
            <ButtonText>Delete</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
}

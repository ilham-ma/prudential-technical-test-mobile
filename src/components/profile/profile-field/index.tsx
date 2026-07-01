import { View } from "react-native";
import { Text } from "../../ui/text";
import { IProfileFieldProps } from "./props.interface";

export default function ProfileField({ label, value }: IProfileFieldProps) {
  return (
    <View className="flex-row justify-between py-3 border-b border-border">
      <Text className="text-muted-foreground">{label}</Text>
      <Text className="font-medium">{value}</Text>
    </View>
  );
}

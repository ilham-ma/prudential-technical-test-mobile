import { Center } from "../ui/center";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { IComingSoonScreenProps } from "./props.interface";

export default function ComingSoonScreen(props: IComingSoonScreenProps) {
  const title = props.featureName
    ? `${props.featureName} is coming soon!`
    : "Coming Soon!";

  return (
    <Center className="flex-1 px-6">
      <VStack space="sm" className="items-center">
        <Heading className="text-2xl text-center">{title}</Heading>
        <Text className="text-center text-typography-500">
          We're working hard to bring this feature to you. Stay tuned!
        </Text>
      </VStack>
    </Center>
  );
}

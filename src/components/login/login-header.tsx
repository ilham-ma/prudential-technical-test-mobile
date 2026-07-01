import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

export default function LoginHeader() {
  return (
    <VStack>
      <Heading className="text-2xl">Login</Heading>
      <Text>Welcome back! Let's get you signed in.</Text>
    </VStack>
  );
}

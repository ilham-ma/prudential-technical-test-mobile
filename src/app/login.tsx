import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginForm from "../components/login/login-form";
import { LoginFormValues } from "../components/login/login-form/schema";
import LoginHeader from "../components/login/login-header";
import { Card } from "../components/ui/card";
import { Center } from "../components/ui/center";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "../components/ui/toast";
import { VStack } from "../components/ui/vstack";
import { authService_login } from "../services/auth.service";
import { ILoginResponse } from "../interfaces/auth/login-response.interface";

export default function Login() {
  const toast = useToast();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: authService_login,
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error?.response?.data?.message ?? "Login failed. Please try again.";
      toast.show({
        placement: "top",
        duration: 4000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} variant="solid" action="error">
            <ToastTitle>Login Failed</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </Toast>
        ),
      });
    },
    onSuccess: async (data: ILoginResponse) => {
      const accessToken = data?.accessToken;
      if (!accessToken) return;
      await SecureStore.setItemAsync("access_token", accessToken);
    },
  });

  async function handleSubmit(values: LoginFormValues) {
    await mutateAsync(values);
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView>
      <Center className="flex items-center min-h-screen p-10">
        <Card className="w-full p-10">
          <VStack space="3xl">
            <LoginHeader />
            <LoginForm loading={isPending} onSubmit={handleSubmit} />
          </VStack>
        </Card>
      </Center>
    </SafeAreaView>
  );
}

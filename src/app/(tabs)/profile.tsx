import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Image, RefreshControl, ScrollView } from "react-native";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, ButtonText } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Heading } from "../../components/ui/heading";
import { Skeleton, SkeletonText } from "../../components/ui/skeleton";
import { Text } from "../../components/ui/text";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "../../components/ui/toast";
import { VStack } from "../../components/ui/vstack";
import ProfileField from "../../components/profile/profile-field";
import { authService_getProfile } from "../../services/auth.service";

export default function ProfileScreen() {
  const toast = useToast();

  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ["profile"],
    queryFn: authService_getProfile,
  });

  useEffect(() => {
    if (isError) {
      const message =
        (error as AxiosError<{ message?: string }>)?.response?.data?.message ??
        "Failed to load profile. Please try again.";
      toast.show({
        placement: "top",
        duration: 4000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} variant="solid" action="error">
            <ToastTitle>Failed to load profile</ToastTitle>
            <ToastDescription>{message}</ToastDescription>
          </Toast>
        ),
      });
    }
  }, [isError]);

  function handleLogout() {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await SecureStore.deleteItemAsync("access_token");
          router.replace("/login");
        },
      },
    ]);
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
        }
      >
        <VStack space="2xl" className="p-6 items-center">
          <Skeleton isLoaded={!isPending} className="w-32 h-32 rounded-full">
            <Image
              source={{ uri: data?.image }}
              className="w-32 h-32 rounded-full"
              resizeMode="cover"
            />
          </Skeleton>

          {isPending ? (
            <SkeletonText _lines={1} className="h-7 w-48" />
          ) : (
            <Heading className="text-center text-xl">
              {data?.firstName} {data?.lastName}
            </Heading>
          )}

          <Card className="w-full p-6">
            {isPending ? (
              <SkeletonText _lines={4} className="h-5 w-full" />
            ) : (
              <VStack>
                <ProfileField label="Email" value={data?.email ?? ""} />
                <ProfileField label="Age" value={String(data?.age ?? "")} />
                <ProfileField label="Gender" value={data?.gender ?? ""} />
                <ProfileField
                  label="Maiden Name"
                  value={data?.maidenName ?? ""}
                />
              </VStack>
            )}
          </Card>

          <Button variant="destructive" className="w-full" onPress={handleLogout}>
            <ButtonText>Logout</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}

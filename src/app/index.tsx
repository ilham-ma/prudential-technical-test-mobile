import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("access_token");

      if (token) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    })();
  }, []);

  return null;
}

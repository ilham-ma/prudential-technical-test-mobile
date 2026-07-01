import { router } from "expo-router";
import { useEffect } from "react";
import * as Keychain from "react-native-keychain";

export default function Index() {
  useEffect(() => {
    (async () => {
      const credentials = await Keychain.getGenericPassword({
        service: "access_token",
      });

      if (credentials && credentials.password) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    })();
  }, []);

  return null;
}

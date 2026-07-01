import { router, Tabs } from "expo-router";
import { useEffect, useState } from "react";
import * as Keychain from "react-native-keychain";

export default function TabsLayout() {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const credentials = await Keychain.getGenericPassword({
        service: "access_token",
      });

      if (!credentials || !credentials.password) {
        router.replace("/login");
        return;
      }

      setIsChecking(false);
    })();
  }, []);

  if (isChecking) return null;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="recipes" options={{ title: "Recipes" }} />
      <Tabs.Screen name="add-product" options={{ title: "Add Product" }} />
      <Tabs.Screen name="cart" options={{ title: "Cart" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

import { router, Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function TabsLayout() {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("access_token");

      if (!token) {
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

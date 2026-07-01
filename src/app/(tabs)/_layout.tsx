import {
  AddIcon,
  AtSignIcon,
  CalendarDaysIcon,
  FavouriteIcon,
  HomeIcon,
  Icon,
} from "../../components/ui/icon";
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
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Icon as={HomeIcon} size="lg" style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color }) => (
            <Icon as={CalendarDaysIcon} size="lg" style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-product"
        options={{
          title: "Add Product",
          tabBarIcon: ({ color }) => (
            <Icon as={AddIcon} size="lg" style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <Icon as={FavouriteIcon} size="lg" style={{ color }} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon as={AtSignIcon} size="lg" style={{ color }} />
          ),
        }}
      />
    </Tabs>
  );
}

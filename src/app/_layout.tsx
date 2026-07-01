import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/src/global.css";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "../utils/redux.util";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ReduxProvider store={store}>
      <GluestackUIProvider mode="light">
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AnimatedSplashOverlay />
          <AppTabs />
        </ThemeProvider>
      </GluestackUIProvider>
    </ReduxProvider>
  );
}

import { Text } from "react-native";
import { Stack } from "expo-router/stack";
import { SplashScreen, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { AppProvider } from "../context/ctx";
import { FancyButton } from "../components/FancyButton";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Lora: require("../assets/fonts/Lora.ttf"),
    Roboto: require("../assets/fonts/Roboto-Thin.ttf"),
  });
  const router = useRouter();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppProvider>
      <Stack>
        <Stack.Screen
          name="book_filter"
          options={{
            title: "",
            headerStyle: {
              backgroundColor: "black",
            },
          }}
        />
        <Stack.Screen
          name="QuoteCreation"
          options={{
            title: "",
            headerRight: () => {
              return (
                <FancyButton
                  size="small"
                  text="Done"
                  onPress={() => {
                    router.navigate("/");
                  }}
                />
              );
            },
            headerStyle: {
              backgroundColor: "black",
            },
          }}
        />
        <Stack.Screen
          name="camera"
          options={{ presentation: "fullScreenModal", headerShown: false }}
        />
        <Stack.Screen
          name="photo_analysis"
          options={{ presentation: "fullScreenModal", headerShown: false }}
        />
        <StatusBar style="light" />
      </Stack>
    </AppProvider>
  );
}

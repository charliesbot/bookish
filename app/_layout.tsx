import { Link } from "expo-router";
import { Stack } from "expo-router/stack";
import { AppProvider } from "../context/ctx";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="book_filter" options={{ title: "" }} />
        <Stack.Screen name="QuoteCreation" options={{ title: "" }} />
        <Stack.Screen
          name="camera"
          options={{ presentation: "fullScreenModal", headerShown: false }}
        />
        <Stack.Screen
          name="photo_analysis"
          options={{ presentation: "fullScreenModal", headerShown: false }}
        />
        {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
      </Stack>
    </AppProvider>
  );
}

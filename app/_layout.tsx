import { Link } from "expo-router";
import { Stack } from "expo-router/stack";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "",
          headerRight: () => <Link href="/book_filter">Next</Link>,
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
      {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
    </Stack>
  );
}

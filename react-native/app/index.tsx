import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useAppData } from "../context/ctx";
import FeatherIcons from "@expo/vector-icons/Feather";
import { CURRENT_MAIN_APP_COLOR } from "../constants/constants";

const BOTTOM_BAR_HEIGHT = 100;

export default function App() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { importedQuote } = params;
  const [text, onChangeText] = useState("");
  const context = useAppData();

  useEffect(() => {
    if (importedQuote != undefined) {
      onChangeText(importedQuote as string);
    }
  }, [importedQuote]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerStyle: {
            backgroundColor: "black",
          },
          headerShadowVisible: false, // applied here
          headerRight: () => (
            <Link
              href="/book_filter"
              style={{
                color: "white",
              }}
              onPress={() => context?.updateBookQuote(text)}
            >
              Next
            </Link>
          ),
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? BOTTOM_BAR_HEIGHT : 0}
      >
        <TextInput
          autoFocus
          onChangeText={onChangeText}
          value={text}
          placeholder="A thoughtful quote..."
          placeholderTextColor="#aaaaaa"
          style={styles.input}
          multiline
        />
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.openCameraButton}
            onPress={() => router.push("/camera")}
          >
            <FeatherIcons
              name="camera"
              size={20}
              color={CURRENT_MAIN_APP_COLOR}
            />
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  input: {
    flex: 1,
    fontWeight: "bold",
    paddingHorizontal: 20,
    color: "white",
    paddingVertical: 40,
    borderWidth: 1,
    fontSize: 28,
    borderStyle: "solid",
  },
  bottomBar: {
    borderTopColor: "#aaaaaa",
    borderTopWidth: 1,
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    // height: BOTTOM_BAR_HEIGHT,
  },
  openCameraButton: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    color: "white",
    width: 36,
    height: 36,
  },
});

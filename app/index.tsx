import { StatusBar } from "expo-status-bar";
import { useKeyboard } from "@react-native-community/hooks";
import { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useLocalSearchParams } from "expo-router";

const BOTTOM_BAR_HEIGHT = 100;

export default function App() {
  const params = useLocalSearchParams();
  const { importedQuote } = params;
  console.log("TEST TEST TEST ", importedQuote);
  const [text, onChangeText] = useState("");
  const keyboard = useKeyboard();

  useEffect(() => {
    if (importedQuote != undefined) {
      console.log("WHAT");
      onChangeText(importedQuote as string);
    }
  }, [importedQuote]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? keyboard.keyboardHeight + BOTTOM_BAR_HEIGHT : 0
      }
    >
      <SafeAreaView />
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="A thoughtful quote..."
        style={styles.input}
        multiline
      />
      <View style={styles.bottomBar}>
        <Link style={styles.openCameraButton} href="/camera">
          Camera
        </Link>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "cyan",
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: BOTTOM_BAR_HEIGHT,
  },
  openCameraButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});

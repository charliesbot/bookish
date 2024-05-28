import { StatusBar } from "expo-status-bar";
import { useKeyboard } from "@react-native-community/hooks";
import { useState } from "react";
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
import { Link } from "expo-router";

const BOTTOM_BAR_HEIGHT = 100;

export default function App() {
  const [text, onChangeText] = useState("");
  const keyboard = useKeyboard();

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
        autoFocus
        onChangeText={onChangeText}
        value={text}
        placeholder="A thoughtful quote..."
        style={styles.input}
        multiline
      />
      <View style={styles.bottomBar}>
        <Link href="/camera">Camera</Link>
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cyan",
  },
  input: {
    flex: 1,
  },
  bottomBar: {
    height: BOTTOM_BAR_HEIGHT,
    backgroundColor: "red",
  },
});

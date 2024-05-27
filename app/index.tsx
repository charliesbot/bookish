import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder="A thoughtful quote..."
        style={styles.input}
        multiline
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "cyan",
  },
  input: {},
});

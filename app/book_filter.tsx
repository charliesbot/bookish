import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookFilter() {
  const [text, onChangeText] = useState("");

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TextInput
        placeholder="Search"
        onChangeText={onChangeText}
        value={text}
        clearButtonMode="always"
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

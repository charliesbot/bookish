import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchBooks } from "../hooks/useSearchBooks";
import { BookRow } from "../components/BookRow";
import { Divider } from "../components/Divider";

export default function BookFilter() {
  const [text, onChangeText] = useState("");
  const { books, loading } = useSearchBooks(text);

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <TextInput
        placeholder="Search"
        onChangeText={onChangeText}
        value={text}
        clearButtonMode="always"
      />
      <FlatList
        style={styles.list}
        data={books}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => <BookRow book={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "cyan",
  },
  input: {},
  list: {
    padding: 20,
  },
});

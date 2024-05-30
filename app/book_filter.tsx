import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchBooks } from "../hooks/useSearchBooks";
import { BookRow } from "../components/BookRow";
import { Divider } from "../components/Divider";
import { useAppData } from "../context/ctx";
import { useRouter } from "expo-router";

export default function BookFilter() {
  const [text, onChangeText] = useState("");
  const { books, loading } = useSearchBooks(text);
  const context = useAppData();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
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
        renderItem={({ item }) => (
          <BookRow
            book={item}
            onPress={() => {
              context?.updateBook(item);
              router.navigate("/QuoteCreation");
            }}
          />
        )}
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
  searchInput: {
    height: 60,
    paddingHorizontal: 20,
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
  },
  input: {},
  list: {
    padding: 20,
  },
});

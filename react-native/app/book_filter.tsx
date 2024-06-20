import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useSearchBooks } from "../hooks/useSearchBooks";
import { BookRow } from "../components/BookRow";
import { Divider } from "../components/Divider";
import { useAppData } from "../context/ctx";
import { useRouter } from "expo-router";
import { Spacer } from "../components/Space";
import { CURRENT_MAIN_APP_COLOR } from "../constants/constants";
import { convertHexaToRGB } from "../hooks/useImageColors";

export default function BookFilter() {
  const [text, onChangeText] = useState("");
  const { books, loading } = useSearchBooks(text);
  const context = useAppData();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholderTextColor="#aaaaaa"
        placeholder="Search"
        onChangeText={onChangeText}
        value={text}
        clearButtonMode="always"
      />
      <FlatList
        style={styles.list}
        data={books}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <Spacer height={12} />}
        renderItem={({ item, index }) => (
          <BookRow
            book={item}
            isLast={index == books.length - 1}
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
    backgroundColor: "black",
  },
  searchInput: {
    color: "white",
    height: 60,
    fontWeight: 600,
    paddingHorizontal: 20,
    borderColor: CURRENT_MAIN_APP_COLOR,
    backgroundColor: convertHexaToRGB(CURRENT_MAIN_APP_COLOR, 0.2).toString(),
    borderStyle: "solid",
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: 20,
  },
  input: {},
  list: {
    padding: 20,
  },
});

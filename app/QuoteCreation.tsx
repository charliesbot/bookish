import { StatusBar } from "expo-status-bar";
import { FC, useState } from "react";
import {
  FlatList,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSearchBooks } from "../hooks/useSearchBooks";
import { BookRow } from "../components/BookRow";
import { Divider } from "../components/Divider";
import { useAppData } from "../context/ctx";
import { useRouter } from "expo-router";
import { BookType } from "../types/types";
import { QuotePreview } from "../components/QuotePreview";

export default function QuoteCreation() {
  const context = useAppData();

  console.log("teeest ", context?.book);

  if (!context?.book || !context?.bookQuote) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <QuotePreview quote={context.bookQuote} book={context.book} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {},
  list: {
    padding: 20,
  },
});

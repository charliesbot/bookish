import { StatusBar } from "expo-status-bar";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { FC, LegacyRef, useRef, useState } from "react";
import {
  FlatList,
  PixelRatio,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  const viewShotRef = useRef<ViewShot>();

  const captureAndShareScreenshot = () => {
    viewShotRef.current
      ?.capture?.()
      .then((uri) => {
        Sharing.shareAsync("file://" + uri);
      })
      .catch((e) => console.error(e));
  };

  if (!context?.book || !context?.bookQuote) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ViewShot
        ref={viewShotRef as LegacyRef<ViewShot>}
        options={{ format: "jpg", quality: 0.9 }}
      >
        <QuotePreview quote={context.bookQuote} book={context.book} />
      </ViewShot>
      <TouchableOpacity onPress={captureAndShareScreenshot}>
        <Text>Share</Text>
      </TouchableOpacity>
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

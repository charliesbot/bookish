import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { BookType } from "../types/types";
import { FC } from "react";
import { Spacer } from "./Space";
import { Image } from "expo-image";
import { convertHexaToRGB } from "../hooks/useImageColors";
import { CURRENT_MAIN_APP_COLOR } from "../constants/constants";

type Props = {
  book: BookType;
  onPress: (book: BookType) => void;
  isLast: boolean;
};

export const BookRow: FC<Props> = ({ book, onPress, isLast }) => {
  return (
    <>
      <TouchableOpacity onPress={() => onPress(book)} style={styles.container}>
        <Image
          contentFit="cover"
          source={{ uri: book.image }}
          style={styles.cover}
        />
        <Spacer width={20} />
        <View style={styles.content}>
          <Text style={styles.title}>{book.title}</Text>
          <Spacer height={8} />
          <Text style={styles.authors}>{book.authors}</Text>
        </View>
      </TouchableOpacity>
      {isLast ? <Spacer height={100} /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: convertHexaToRGB(CURRENT_MAIN_APP_COLOR, 0.1).toString(),
    flex: 1,
    borderRadius: 12,
    paddingVertical: 20,
    paddingStart: 20,
    paddingEnd: 40,
  },
  cover: {
    width: 70,
    height: 100,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    lineHeight: 26,
    fontSize: 18,
    color: "white",
  },
  authors: {
    color: "white",
    fontSize: 12,
  },
});

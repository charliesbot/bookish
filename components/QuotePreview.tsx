import { FC } from "react";
import { View, Text, StyleSheet, PixelRatio } from "react-native";
import { Image } from "expo-image";
import { BookType } from "../types/types";
import { Spacer } from "./Space";

type Props = {
  quote: String;
  book: BookType;
};

const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 300;

export const QuotePreview: FC<Props> = ({ quote, book }) => {
  const scale = PixelRatio.get(); // Gets the device's pixel density
  const desiredWidth = 1000;
  const desiredHeight = 562; // Desired height in pixels
  const widthInDP = desiredWidth / scale; // Converts desired width to density-independent pixels
  const heightInDP = desiredHeight / scale; // Converts desired height to density-independent pixels
  return (
    <View style={[styles.container, { width: widthInDP, height: heightInDP }]}>
      <View style={styles.contentColumn}>
        <View style={styles.quoteRow}>
          <View style={styles.line} />
          <Spacer width={4} />
          <Text style={styles.quote}>{quote}</Text>
        </View>
        <Spacer height={10} />
        <Text style={styles.title}>{book.title}</Text>
        <Spacer height={2} />
        <Text style={styles.authors}>{book.authors}</Text>
      </View>
      <Image
        source={{ uri: book.image }}
        style={styles.cover}
        contentFit="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
    backgroundColor: "red",
    overflow: "hidden",
  },
  quoteRow: {
    flexDirection: "row",
  },
  line: {
    backgroundColor: "black",
    width: 4,
  },
  contentColumn: {
    justifyContent: "center",
    paddingRight: 130,
    paddingLeft: 30,
  },
  cover: {
    position: "absolute",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    right: -(IMAGE_WIDTH / 2),
    top: -(IMAGE_HEIGHT / 6),
    transform: [{ rotate: "10deg" }],
  },
  quote: {},
  title: {
    fontSize: 10,
  },
  authors: {
    fontSize: 8,
  },
});

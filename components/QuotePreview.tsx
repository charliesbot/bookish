import { FC, LegacyRef, useRef } from "react";
import { View, Text, StyleSheet, PixelRatio } from "react-native";
import { Image } from "expo-image";
import { BookType } from "../types/types";
import { Spacer } from "./Space";
import { useImageColors } from "../hooks/useImageColors";

type Props = {
  quote: String;
  book: BookType;
};

const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 300;
const LEFT_PADDING = 10;

export const QuotePreview: FC<Props> = ({ quote, book }) => {
  const colors = useImageColors(book.image);
  const scale = PixelRatio.get(); // Gets the device's pixel density
  const desiredWidth = 1000;
  const desiredHeight = 562; // Desired height in pixels
  const widthInDP = desiredWidth / scale; // Converts desired width to density-independent pixels
  const heightInDP = desiredHeight / scale; // Converts desired height to density-independent pixels
  const selectedColor = colors?.colorTwo;

  return (
    <View
      style={[
        styles.container,
        {
          width: widthInDP,
          height: heightInDP,
          backgroundColor: selectedColor?.backgroundColor,
        },
      ]}
    >
      <View style={styles.contentColumn}>
        <View style={styles.quoteRow}>
          <View style={styles.line} />
          <Spacer width={8} />
          <Text
            style={[styles.quote, { color: selectedColor?.foregroundColor }]}
          >
            {quote}
          </Text>
        </View>
        <Spacer height={10} />
        <View style={styles.metadataColumn}>
          <Text
            style={[styles.title, { color: selectedColor?.foregroundColor }]}
          >
            {book.title}
          </Text>
          <Spacer height={2} />
          <Text
            style={[styles.authors, { color: selectedColor?.foregroundColor }]}
          >
            {book.authors}
          </Text>
        </View>
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
    paddingRight: 140,
    paddingLeft: 30,
  },
  metadataColumn: {
    paddingLeft: 10,
  },
  cover: {
    position: "absolute",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    right: -(IMAGE_WIDTH / 2),
    top: -(IMAGE_HEIGHT / 6),
    transform: [{ rotate: "10deg" }],
  },
  quote: {
    fontSize: 12,
  },
  title: {
    fontSize: 10,
  },
  authors: {
    fontSize: 8,
  },
});

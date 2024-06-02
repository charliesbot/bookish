import { FC, LegacyRef, useRef } from "react";
import { View, Text, StyleSheet, PixelRatio } from "react-native";
import { Image } from "expo-image";
import { BookType, ForegroundAndBackground } from "../types/types";
import { Spacer } from "./Space";
import { useImageColors } from "../hooks/useImageColors";

type Props = {
  quote: String;
  book: BookType;
  color: ForegroundAndBackground;
};

const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 300;
const LEFT_PADDING = 10;

export const QuotePreview: FC<Props> = ({ quote, book, color }) => {
  const scale = PixelRatio.get(); // Gets the device's pixel density
  const desiredWidth = 1000;
  const desiredHeight = 562; // Desired height in pixels
  const widthInDP = desiredWidth / scale; // Converts desired width to density-independent pixels
  const heightInDP = desiredHeight / scale; // Converts desired height to density-independent pixels
  const dynamicQuoteFontSize = quote.length > 150 ? 10 : 12;

  return (
    <View
      style={[
        styles.container,
        {
          width: widthInDP,
          height: heightInDP,
          backgroundColor: color?.backgroundColor,
        },
      ]}
    >
      <View style={styles.contentColumn}>
        <View style={styles.quoteRow}>
          <View style={styles.line} />
          <Spacer width={8} />
          <Text
            style={[
              styles.quote,
              { color: color?.foregroundColor, fontSize: dynamicQuoteFontSize },
            ]}
          >
            {quote}
          </Text>
        </View>
        <Spacer height={10} />
        <View style={styles.metadataColumn}>
          <Text style={[styles.title, { color: color?.foregroundColor }]}>
            {book.title}
          </Text>
          <Spacer height={2} />
          <Text style={[styles.authors, { color: color?.foregroundColor }]}>
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
    paddingRight: 150,
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
    fontFamily: "Lora",
    lineHeight: 12,
  },
  title: {
    fontFamily: "Roboto",
    fontSize: 9,
  },
  authors: {
    fontFamily: "Roboto",
    fontSize: 6,
  },
});

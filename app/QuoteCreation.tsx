import { FC, LegacyRef, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { useAppData } from "../context/ctx";
import { QuotePreview } from "../components/QuotePreview";
import { useImageColors } from "../hooks/useImageColors";
import { BookPalette, BookPaletteKey, MaybeNull } from "../types/types";
import { Spacer } from "../components/Space";

type ColorOptionsBarProps = {
  colors: BookPalette;
  onSelectColor: (colorKey: BookPaletteKey) => void;
  selectedColor: BookPaletteKey;
};

const ColorOptionsBar: React.FC<ColorOptionsBarProps> = ({
  colors,
  onSelectColor,
  selectedColor,
}) => {
  const entries = Object.entries(colors);
  return (
    <View style={styles.colorRow}>
      {entries.map((entry, index) => {
        const [key, color] = entry;
        const isSelected = key == selectedColor;
        return (
          <View style={[styles.colorOptionWrapper]}>
            <TouchableOpacity
              onPress={() => onSelectColor(key as BookPaletteKey)}
            >
              <View
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: color.backgroundColor,
                    borderColor: isSelected
                      ? color.originalColor
                      : "transparent",
                  },
                ]}
              />
            </TouchableOpacity>
            {index < entries.length - 1 ? <Spacer width={20} /> : null}
          </View>
        );
      })}
    </View>
  );
};

export default function QuoteCreation() {
  const context = useAppData();
  const viewShotRef = useRef<ViewShot>();
  const colors = useImageColors(context?.book?.image);
  const [color, setColor] = useState<MaybeNull<BookPaletteKey>>("colorOne");

  const captureAndShareScreenshot = () => {
    viewShotRef.current
      ?.capture?.()
      .then((uri) => {
        Sharing.shareAsync("file://" + uri);
      })
      .catch((e) => console.error(e));
  };

  if (!context?.book || !context?.bookQuote || !colors || !color) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ViewShot
        ref={viewShotRef as LegacyRef<ViewShot>}
        options={{ format: "jpg", quality: 1 }}
      >
        <QuotePreview
          quote={context.bookQuote}
          book={context.book}
          color={colors[color]}
        />
      </ViewShot>
      <Spacer height={20} />
      <ColorOptionsBar
        colors={colors}
        selectedColor={color}
        onSelectColor={(color) => setColor(color)}
      />
      <Spacer height={20} />
      <TouchableOpacity onPress={captureAndShareScreenshot}>
        <Text>Share</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const COLOR_OPTION_SIZE = 50;
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
  colorRow: {
    flexDirection: "row",
  },
  colorOptionWrapper: {
    flexDirection: "row",
  },
  colorOption: {
    height: COLOR_OPTION_SIZE,
    width: COLOR_OPTION_SIZE,
    borderRadius: COLOR_OPTION_SIZE,
    borderStyle: "solid",
    borderWidth: 10,
  },
});

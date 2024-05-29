import { CameraCapturedPicture } from "expo-camera";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { MaybeNull } from "../types/types";
import { Image } from "expo-image";
import { LiveTextView } from "react-native-live-text-view";

export default function PhotoAnalysis() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [photoData, setPhotoData] =
    useState<MaybeNull<CameraCapturedPicture>>(undefined);
  const [selection, setSelection] = useState("");
  const { photo } = params;

  useEffect(() => {
    if (photo !== undefined) {
      setPhotoData(JSON.parse(photo as string));
    }
  }, [photo]);

  if (!photoData) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <LiveTextView
        onReady={(event) =>
          console.log(`Image analyze result: ${JSON.stringify(event)}`)
        }
        onError={(event) => console.log(`Image analyze error: ${event.error}`)}
        onHighlightChange={(isHighlight) =>
          console.log(`isHighlight: ${isHighlight}`)
        }
        onTextSelectionChange={(event) => {
          console.log(
            `hasActiveTextSelection: ${event.hasActiveTextSelection}`,
            `selectedText: ${event.selectedText}`
          );
          setSelection(event.selectedText);
        }}
      >
        <Image source={{ uri: photoData.uri }} style={styles.backgroundImage} />
        {/* <Image
          source={{ uri: photoData.uri }}
          style={styles.backgroundImage}
          contentFit="cover"
          transition={500}
        /> */}
      </LiveTextView>
      {/* <Button title="Go back" onPress={router.back} /> */}
      <Link
        href={{
          pathname: "/",
          params: {
            importedQuote: selection,
          },
        }}
        style={styles.link}
      >
        Use Selection
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    position: "absolute",
    bottom: 50,
    color: "white",
  },
  backgroundImage: {
    flex: 1,
    // width: "100%",
    width: 450,
  },
  button: {
    position: "absolute",
    top: 200,
  },
  buttonText: {
    color: "red",
  },
  useSelectionButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    color: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
});

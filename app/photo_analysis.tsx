import { CameraCapturedPicture } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { MaybeNull } from "../types/types";

export default function PhotoAnalysis() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [photoData, setPhotoData] =
    useState<MaybeNull<CameraCapturedPicture>>(undefined);
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
      <ImageBackground
        source={{ uri: photoData.uri }}
        style={styles.backgroundImage}
      >
        <Button title="Go back" onPress={router.back} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
  },
  input: {
    flex: 1,
  },
  bottomBar: {},
});

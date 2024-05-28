import {
  Camera,
  CameraView,
  CameraViewRef,
  PermissionStatus,
  useCameraPermissions,
} from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { MaybeNull } from "../types/types";
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const cameraRef = useRef<CameraViewRef>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!permission?.granted) {
        await requestPermission();
      }
    })();
  }, [permission, requestPermission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePicture = () => {
    if (permission?.granted) {
      cameraRef.current
        ?.takePictureAsync({
          quality: 1.0, // Reduces file size
          base64: false, // Keeps the photo as a file
          exif: false, // No metadata
        })
        .then((photo) => {
          router.push({
            pathname: "/photo_analysis",
            params: { photo: JSON.stringify(photo) },
          });
        })
        .catch((e) => console.log("TEST ERROR", e));
    }
  };

  return (
    <CameraView style={styles.container} facing="back" ref={cameraRef as any}>
      <View style={styles.spacer} />
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={takePicture}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  bottomBar: {
    display: "flex",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});

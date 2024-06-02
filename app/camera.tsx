import { CameraView, CameraViewRef, useCameraPermissions } from "expo-camera";
import { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { CloseButton } from "../components/CloseButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { CapturePhotoButton } from "../components/CapturePhotoButton";

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
        .catch((e: Error) => console.log("TEST ERROR", e));
    }
  };

  return (
    <CameraView style={styles.container} facing="back" ref={cameraRef as any}>
      <SafeAreaView />
      <CloseButton style={styles.closeButton} />
      <View style={styles.spacer} />
      <View style={styles.bottomContainer}>
        <CapturePhotoButton onPress={takePicture} />
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  closeButton: {
    marginLeft: 20,
  },
  spacer: {
    flex: 1,
  },
  bottomContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  takePhotoButton: {
    color: "white",
  },
});

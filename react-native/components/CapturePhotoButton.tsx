import { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  style?: Object;
  onPress: TouchableOpacity["props"]["onPress"];
};

export const CapturePhotoButton: FC<Props> = (props) => {
  const { onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, props.style]}
    ></TouchableOpacity>
  );
};

const SIZE = 80;

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderWidth: 5,
    borderStyle: "solid",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
});

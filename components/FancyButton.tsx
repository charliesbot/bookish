import { FC, ReactNode } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import {
  CURRENT_MAIN_APP_COLOR,
  CURRENT_MAIN_APP_FOREGROUND_COLOR,
} from "../constants/constants";

type Props = {
  text: string;
  style?: Object;
  onPress: TouchableOpacity["props"]["onPress"];
};

export const FancyButton: FC<Props> = (props) => {
  const { text, onPress } = props;

  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CURRENT_MAIN_APP_COLOR,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  text: {
    fontWeight: "bold",
    color: CURRENT_MAIN_APP_FOREGROUND_COLOR,
  },
});

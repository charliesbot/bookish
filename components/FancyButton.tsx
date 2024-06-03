import { FC, ReactNode } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import {
  CURRENT_MAIN_APP_COLOR,
  CURRENT_MAIN_APP_FOREGROUND_COLOR,
} from "../constants/constants";

type ButtonSize = "small" | "medium";

type Props = {
  text: string;
  style?: Object;
  onPress: TouchableOpacity["props"]["onPress"];
  size?: ButtonSize;
};

const getStyles = (size: ButtonSize) => {
  if (size == "small") {
    return {
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 100,
      minWidth: 50,
    };
  }

  return {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 100,
    minWidth: 100,
  };
};

export const FancyButton: FC<Props> = (props) => {
  const { text, onPress, size = "medium" } = props;

  const buttonSizeStyles = getStyles(size);
  const fontSize = size == "small" ? 12 : 14;

  return (
    <TouchableOpacity
      style={[styles.container, buttonSizeStyles, props.style]}
      onPress={onPress}
    >
      <Text style={[styles.text, { fontSize }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CURRENT_MAIN_APP_COLOR,
  },
  text: {
    fontWeight: "bold",
    color: CURRENT_MAIN_APP_FOREGROUND_COLOR,
  },
});

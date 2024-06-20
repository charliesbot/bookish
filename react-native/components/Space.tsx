import { FC } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  width?: number;
  height?: number;
};

export const Spacer: FC<Props> = ({ width, height }: Props) => {
  const style = styles({ width, height });
  return <View style={style.container} />;
};

const styles = ({ width, height }: Props) =>
  StyleSheet.create({
    container: {
      width: width,
      height: height,
    },
  });

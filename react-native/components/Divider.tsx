import { FC } from "react";
import { View, StyleSheet } from "react-native";

export const Divider: FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    height: 1,
    marginVertical: 10,
  },
});

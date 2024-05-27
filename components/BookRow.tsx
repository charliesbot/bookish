import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { BookType } from "../types/types";
import { FC } from "react";
import { Spacer } from "./Space";

type Props = {
  book: BookType;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  cover: {
    width: 70,
    height: 100,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
  },
});

export const BookRow: FC<Props> = ({ book }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={{ uri: book.image }}
          style={styles.cover}
        />
        <Spacer width={14} />
        <View style={styles.content}>
          <Text style={styles.title}>{book.title}</Text>
          <Text>{book.authors}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

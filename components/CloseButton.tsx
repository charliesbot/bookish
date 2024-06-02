import { View, StyleSheet, TouchableOpacity } from "react-native";
import FeatherIcons from "@expo/vector-icons/Feather";
import { CURRENT_MAIN_APP_COLOR } from "../constants/constants";
import { useRouter } from "expo-router";

type Props = {
  style?: Object;
};

export const CloseButton: React.FC<Props> = ({ style = {} }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[closeButtonStyle.container, style]}
      onPress={() => router.back()}
    >
      <FeatherIcons name="x" size={32} color={CURRENT_MAIN_APP_COLOR} />
    </TouchableOpacity>
  );
};

const closeButtonStyle = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});

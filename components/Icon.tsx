import { FC } from "react";
import FeatherIcons from "@expo/vector-icons/Feather";

type Props = {
  size?: number;
  iconName: "camera";
};

export const Icon: FC<Props> = (props: Props) => {
  const { size = 32, iconName } = props;
  const pastelColor = "FFE5B4";

  return <FeatherIcons color={pastelColor} size={size} name={iconName} />;
};

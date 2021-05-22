import React from "react";
import {
  StyleSheet,
  Image,
  ImageSourcePropType,
  ViewStyle,
  ImageStyle,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme";

type TProps = {
  source?: ImageSourcePropType;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  status?: "online" | "bussy";
};

export const Avatar: React.FC<TProps> = props => {
  return (
    <View style={[styles.container, props.style]}>
      <Image source={props.source} style={[styles.image, props.imageStyle]} />
      {props.status && (
        <View
          style={[
            styles.status,
            {
              backgroundColor:
                props.status === "online"
                  ? Theme.colors.status.online
                  : Theme.colors.status.bussy
            }
          ]}
        >
          <Ionicons
            name={props.status === "online" ? "ios-checkmark" : "ios-close"}
            color="white"
            size={15}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 64,
    height: 64,
    borderRadius: 12
  },
  status: {
    position: "absolute",
    width: 16,
    height: 16,
    bottom: -2,
    end: -4,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Theme.colors.grayForBoxBackground,
    borderWidth: 1
  }
});

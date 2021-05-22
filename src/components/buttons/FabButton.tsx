import React from "react";
import { StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme";

type IProps = {
  style?: ViewStyle;
  onPress: () => void;
};

export const FabButton: React.FC<IProps> = props => {
  return (
    <TouchableOpacity
      style={[styles.root, props.style]}
      onPress={props.onPress}
    >
      <Ionicons
        name="ios-add"
        size={34}
        color={Theme.colors.primaryColor}
        style={{ marginStart: 1, marginTop: 2 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    width: 56,
    height: 56,
    position: "absolute",
    bottom: 22,
    end: 20,
    borderRadius: 30,
    shadowColor: Theme.colors.gray,
    shadowOpacity: 0.3,
    shadowOffset: {
      height: 1,
      width: 1
    },
    justifyContent: "center",
    alignItems: "center"
  }
});

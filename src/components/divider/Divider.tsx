import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Theme } from "../../theme";

type TProps = {
  style?: ViewStyle;
  h16?: boolean;
};

export const Divider: React.FC<TProps> = props => {
  return (
    <View
      style={[
        styles.container,
        props.style,
        props.h16 ? { marginHorizontal: 16 } : null
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.dividerColor,
    height: 1
  }
});

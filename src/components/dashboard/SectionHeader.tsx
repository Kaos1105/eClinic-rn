import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Theme } from "../../theme";

type TProps = {
  title: string;
  rightTitle?: string;
  rightAction?: () => void;
};

export const SectionHeader: React.FC<TProps> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      {props.rightTitle && (
        <TouchableOpacity style={styles.tOpacity} onPress={props.rightAction}>
          <Text style={styles.moreText}>{props.rightTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingStart: 16,
    paddingEnd: 4,
    flexDirection: "row"
  },
  text: {
    fontWeight: "600",
    flex: 1,
    color: Theme.colors.black,
    fontSize: 15,
    paddingVertical: 8
  },
  tOpacity: {
    width: "auto",
    justifyContent: "center",
    paddingHorizontal: 12
  },
  moreText: {
    fontWeight: "700",
    color: Theme.colors.primaryColor,
    fontSize: 12
  }
});

import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../theme";
import { HomeMenuItemType } from "../../types";

type TProps = {
  style?: ViewStyle;
  item: HomeMenuItemType;
};

export const DashboardMenuItemRow: React.FC<TProps> = props => {
  return (
    <View style={[styles.container, props.style]}>
      <View
        style={[styles.iconContent, { backgroundColor: props.item.iconBack }]}
      >
        <Ionicons name={props.item.iconName} color="white" size={26} />
      </View>
      <View style={styles.rowsContent}>
        <Text style={styles.row2Text}>{props.item.row1}</Text>
        <Text style={styles.row3Text}>{props.item.row2}</Text>
      </View>
      <View style={styles.rightIconContent}>
        <Ionicons
          name="ios-arrow-forward"
          color={Theme.colors.grayForItemsArrow}
          size={26}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginVertical: 14
  },
  iconContent: {
    width: 48,
    height: 48,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  rowsContent: { flex: 1, paddingHorizontal: 16, justifyContent: "center" },
  row2Text: {
    color: Theme.colors.black,
    fontWeight: "600",
    fontSize: 15,
    marginTop: 3
  },
  row3Text: {
    color: Theme.colors.gray,
    marginTop: 4,
    fontWeight: "600",
    fontSize: 12,
    opacity: 0.8
  },
  rightIconContent: { marginEnd: 8, justifyContent: "center" }
});

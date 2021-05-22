import React from "react";
import { StyleSheet, Image } from "react-native";

export const ToolbarBrandLogo: React.FC = () => (
  <Image style={styles.image} source={require("../../../assets/logo.png")} />
);

const styles = StyleSheet.create({
  image: { width: 120, height: 32, resizeMode: "contain" }
});

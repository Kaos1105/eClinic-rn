import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import HTML from "react-native-render-html";
import { Theme } from "../../theme";

type TProps = {
  htmlContent: string;
  imagesMaxWidthOffset: number;
};

export const HtmlView: React.FC<TProps> = props => {
  return (
    <HTML
      baseFontStyle={styles.htmlBaseFontStyle}
      html={props.htmlContent}
      imagesMaxWidth={
        Dimensions.get("window").width - props.imagesMaxWidthOffset
      }
      tagsStyles={{
        p: { marginVertical: 8 },
        h1: { marginTop: 12, marginBottom: 2, fontSize: 24 },
        h2: { marginTop: 12, marginBottom: 2, fontSize: 22 },
        h3: { marginTop: 12, marginBottom: 2, fontSize: 20 },
        strong: { fontWeight: "600" }
      }}
    />
  );
};

const styles = StyleSheet.create({
  htmlBaseFontStyle: { color: Theme.colors.black, fontSize: 15 }
});

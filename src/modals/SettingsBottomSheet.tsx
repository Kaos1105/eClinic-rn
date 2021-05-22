import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { Theme } from "../theme";
import { useLocalization } from "../localization";
import { Divider } from "../components/divider";

const LangButton: React.FC<{
  title: string;
  isSelected: boolean;
  onPress: () => void;
}> = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[
      styles.langContainer,
      !props.isSelected && {
        backgroundColor: "white",
        borderColor: Theme.colors.gray,
        borderWidth: 1
      }
    ]}
  >
    <Text
      style={[
        styles.langBoxTitleText,
        !props.isSelected && {
          color: Theme.colors.black
        }
      ]}
    >
      {props.title}
    </Text>
  </TouchableOpacity>
);

type TProps = {
  isVisible: boolean;
  onDismissModal: () => void;
};

export const SettingsBottomSheet: React.FC<TProps> = props => {
  const { getString, currentLanguage, changeLanguage } = useLocalization();
  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      swipeDirection={"down"}
      style={styles.modal}
      onSwipeComplete={props.onDismissModal}
      onBackdropPress={props.onDismissModal}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.modalContainer}>
          <View style={styles.langRow}>
            <Text style={styles.langText}>
              {getString("Selected Language")}
            </Text>
            <View style={styles.langBoxes}>
              <LangButton
                title="EN"
                isSelected={currentLanguage() === "en"}
                onPress={() => changeLanguage("en")}
              />
              <LangButton
                title="TR"
                isSelected={currentLanguage() === "tr"}
                onPress={() => changeLanguage("tr")}
              />
            </View>
          </View>
          <Divider style={{ marginVertical: 12 }} />
        </View>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0
  },
  safeAreaContainer: {
    backgroundColor: "white",
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    minHeight: 300
  },
  modalContainer: {
    padding: 24
  },
  langContainer: {
    width: 36,
    height: 36,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    marginHorizontal: 4
  },
  langRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  langBoxes: { flexDirection: "row" },
  langText: {
    flex: 1,
    fontWeight: "600",
    fontSize: 15,
    color: Theme.colors.black
  },
  langBoxTitleText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13
  }
});

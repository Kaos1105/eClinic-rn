import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { eventList } from "../../datas";
import { Divider } from "../../components";
import { Theme } from "../../theme";

type TProps = {};

export const EventListScreen: React.FC<TProps> = props => {
  return (
    <FlatList
      data={eventList}
      keyExtractor={(item, index) => `key${index}`}
      ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
      contentContainerStyle={{ paddingVertical: 12 }}
      renderItem={({ item }) => {
        return (
          <View style={styles.itemContainer}>
            <TouchableOpacity activeOpacity={0.6}>
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.itemHeaderImage}
              />
              <Divider />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.itemContentText}>{item.content}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 8,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "white",
    shadowColor: Theme.colors.gray,
    shadowOpacity: 0.4,
    shadowOffset: { height: 1, width: 0 },
    shadowRadius: 2
  },
  itemHeaderImage: {
    height: 166,
    resizeMode: "cover"
  },
  itemTextContainer: { padding: 8 },
  itemTitleText: {
    fontSize: 16,
    color: Theme.colors.black
  },
  itemContentText: {
    color: Theme.colors.gray,
    fontSize: 13,
    marginTop: 2
  }
});

import React from "react";
import {
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  View
} from "react-native";
import { departmentList } from "../../datas";
import { DepartmentItem } from "../../components";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";

const SCREEN_WIDTH = Dimensions.get("screen").width;

type TProps = {};

export const DepartmentListScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();
  return (
    <FlatList
      data={departmentList}
      keyExtractor={(item, index) => `key${index}ForDepartment`}
      renderItem={row => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NavigationNames.DepartmentDetailScreen, {
              model: JSON.stringify(row.item)
            })
          }
        >
          <DepartmentItem
            item={row.item}
            showShortDesc
            style={styles.departmentItem}
          />
        </TouchableOpacity>
      )}
      numColumns={2}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
      contentContainerStyle={styles.contentContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: 4 },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  departmentItem: { width: SCREEN_WIDTH / 2 - 8 - 8, margin: 4 }
});

import React, { useContext, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doctorsList } from '../../datas';
import { DoctorItemRow, Divider } from '../../components';
import NavigationNames from '../../navigations/NavigationNames';

type TProps = {};

export const DoctorListScreen: React.FC<TProps> = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={doctorsList}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NavigationNames.DoctorDetailScreen, {
              model: JSON.stringify(item),
            })
          }
          style={styles.itemRowContainer}
        >
          <DoctorItemRow item={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => `key${index}ForDoctor`}
      ItemSeparatorComponent={() => <Divider />}
      contentContainerStyle={{ paddingVertical: 12 }}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemRowContainer: { paddingStart: 16, paddingEnd: 8 },
});

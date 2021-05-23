import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ClinicItemRow, Divider, Loading } from '../../components';
import NavigationNames from '../../navigations/NavigationNames';
import { useNavigation } from '@react-navigation/native';
import { RootStoreContext } from 'stores/rootStore';

type TProps = {};

export const ClinicListScreen: React.FC<TProps> = (props) => {
  const rootStore = useContext(RootStoreContext);
  const [appLoaded, setAppLoaded] = useState(false);
  const {
    loadList: loadListClinics,
    dataArray: listClinics,
    totalCount,
  } = rootStore.eC_PHONGKHAM_Store;
  const [lisData, setLisData] = useState(listClinics);

  const fetchMore = async () => {
    await loadListClinics({ maxResultCount: 5, skipCount: lisData.length });
    setLisData(lisData.concat(listClinics));
  };

  const initialRun = async () => {
    //get list data for home screen
    if (listClinics.length > 0) return;
    try {
      await loadListClinics({ maxResultCount: 5 });
      setAppLoaded(true);
    } catch {
      Alert.prompt('Error', 'Can not connect to server');
    }
  };

  useEffect(() => {
    //Load data from backend
    initialRun();
  }, []);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={listClinics}
        onEndReachedThreshold={0.5}
        onEndReached={fetchMore}
        renderItem={(row) => (
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() =>
              navigation.navigate(NavigationNames.ClinicDetailScreen, {
                model: JSON.stringify(row.item),
                title: row.item.phongkhaM_TENDAYDU,
              })
            }
          >
            <ClinicItemRow item={row.item} />
          </TouchableOpacity>
        )}
        ListFooterComponent={totalCount === lisData.length ? null : Loading}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        keyExtractor={(item, index) => `key${index}ForClinic`}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainerStyle: {
    paddingVertical: 16,
  },
  rowItem: {
    paddingHorizontal: 16,
  },
  divider: {
    marginVertical: 16,
  },
});

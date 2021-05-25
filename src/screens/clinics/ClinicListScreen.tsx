import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ClinicItemRow, Divider, Loading } from '../../components';
import NavigationNames from '../../navigations/NavigationNames';
import { useNavigation } from '@react-navigation/native';
import { RootStoreContext } from 'stores/rootStore';
import { observer } from 'mobx-react-lite';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import { FilterDoctorModal } from '../../modals';

type TProps = {};

export const ClinicListScreen: React.FC<TProps> = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const [appLoaded, setAppLoaded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { loadList: loadListClinics, totalCount } = rootStore.eC_PHONGKHAM_Store;
  const [listData, setListData] = useState<EC_PHONGKHAM_ENTITY[]>([]);

  const fetchMore = async () => {
    if (isFetching || totalCount === listData.length) return;
    setIsFetching(true);
    const resultList = await loadListClinics({ maxResultCount: 5, skipCount: listData.length });
    let tempArr = [...listData];
    tempArr = tempArr.concat(resultList);
    setListData(tempArr);
    setIsFetching(false);
  };

  const initialRun = async () => {
    //get list data for home screen
    try {
      const resultList = await loadListClinics({ maxResultCount: 5 });
      setListData(resultList);
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
      <FilterDoctorModal onSubmitFilter={() => {}} />
      <FlatList
        data={listData}
        onEndReachedThreshold={0.05}
        scrollEventThrottle={16}
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
        ListFooterComponent={isFetching ? Loading : null}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        keyExtractor={(item, index) => `key${index}ForClinic`}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

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

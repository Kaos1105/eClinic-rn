import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DoctorItemRow, Divider, Loading } from '../../components';
import NavigationNames from '../../navigations/NavigationNames';
import { RootStoreContext } from 'stores/rootStore';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import { FilterDoctorModal } from '../../modals';
import reactotron from 'reactotron-react-native';

type TProps = {};

export const DoctorListScreen: React.FC<TProps> = () => {
  const rootStore = useContext(RootStoreContext);
  const [appLoaded, setAppLoaded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { loadList: loadListDoctors, totalCount } = rootStore.cM_EMPLOYEE_Store;
  const [listData, setListData] = useState<CM_EMPLOYEE_ENTITY[]>([]);
  const [filterItem, setFilterItem] = useState<CM_EMPLOYEE_ENTITY>(new CM_EMPLOYEE_ENTITY());

  const navigation = useNavigation();

  const fetchMore = async () => {
    if (isFetching || totalCount === listData.length) return;
    setIsFetching(true);
    const resultList = await loadListDoctors({
      maxResultCount: 6,
      skipCount: listData.length,
      chuyenkhoA_ID: filterItem.chuyenkhoA_ID,
      tenanT_ID: filterItem.tenanT_ID,
      emP_NAME: filterItem.emP_NAME,
    });
    let tempArr = [...listData];
    tempArr = tempArr.concat(resultList);
    setListData(tempArr);
    setIsFetching(false);
  };

  const initialRun = async () => {
    //get list data for home screen
    try {
      const resultList = await loadListDoctors({ maxResultCount: 6 });
      setListData(resultList);
      setAppLoaded(true);
    } catch {
      Alert.alert('Error', 'Can not connect to server');
    }
  };

  const fetchWithFilter = async (input: CM_EMPLOYEE_ENTITY) => {
    setFilterItem({
      ...input,
      chuyenkhoA_ID: input.chuyenkhoA_ID,
      tenanT_ID: input.tenanT_ID,
      emP_NAME: input.emP_NAME,
    });
    setAppLoaded(false);
    const resultList = await loadListDoctors({
      maxResultCount: 6,
      chuyenkhoA_ID: input.chuyenkhoA_ID,
      tenanT_ID: input.tenanT_ID,
      emP_NAME: input.emP_NAME,
    });
    setListData(resultList);
    setAppLoaded(true);
  };

  useEffect(() => {
    //Load data from backend
    initialRun();
  }, []);

  return (
    <View style={styles.container}>
      <FilterDoctorModal
        filterSpecialty
        filterClinic
        onSubmitFilter={fetchWithFilter}
        parentName={NavigationNames.DoctorListScreen}
      />
      {!appLoaded ? (
        <Loading />
      ) : (
        <FlatList
          data={listData}
          onEndReachedThreshold={0.05}
          scrollEventThrottle={16}
          onEndReached={fetchMore}
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
          ListFooterComponent={isFetching ? Loading : null}
          keyExtractor={(item, index) => `key${index}ForDoctor`}
          ItemSeparatorComponent={() => <Divider />}
          contentContainerStyle={{ paddingVertical: 12 }}
          style={styles.container}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemRowContainer: { paddingBottom: 14, paddingHorizontal: 8 },
});

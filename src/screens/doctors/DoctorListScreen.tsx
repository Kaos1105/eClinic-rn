import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DoctorItemRow, Divider, Loading } from '../../components';
import NavigationNames from '../../navigations/NavigationNames';
import { RootStoreContext } from 'stores/rootStore';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import { FilterDoctorModal } from '../../modals';
import reactotron from 'reactotron-react-native';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import { observer } from 'mobx-react-lite';
import { useLocalization } from '../../localization';

type TProps = {};

export const DoctorListScreen: React.FC<TProps> = observer(() => {
  //Hook
  const rootStore = useContext(RootStoreContext);
  const { loadList: loadListDoctors, totalCount } = rootStore.cM_EMPLOYEE_Store;
  const { isLoaded, setIsLoaded } = rootStore.commonStore;
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const route = useRoute();

  //State
  const [isFetching, setIsFetching] = useState(false);
  const [listData, setListData] = useState<CM_EMPLOYEE_ENTITY[]>([]);
  const [filterItem, setFilterItem] = useState<CM_EMPLOYEE_ENTITY>(new CM_EMPLOYEE_ENTITY());
  const [param, setParam] = useState<EC_PHONGKHAM_ENTITY>(null);

  //Params
  const initialRun = async () => {
    setIsLoaded(false);
    //get Param
    let parseParam = new EC_PHONGKHAM_ENTITY();
    if (route.params && route.params['param']) {
      parseParam = { ...(JSON.parse(route.params['param']) as EC_PHONGKHAM_ENTITY) };
    }
    setParam(parseParam);
    //get list data for home screen
    try {
      setFilterItem({ tenanT_ID: parseParam.phongkhaM_ID });

      const resultList = await loadListDoctors({
        tenanT_ID: parseParam.phongkhaM_ID,
        maxResultCount: 6,
      });
      setListData(resultList);
    } catch {
      Alert.alert(getString('Error'), getString('Can not connect to server'));
    }
    setIsLoaded(true);
  };

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

  const fetchWithFilter = async (input: CM_EMPLOYEE_ENTITY) => {
    setIsLoaded(false);
    setFilterItem({
      ...input,
      chuyenkhoA_ID: input.chuyenkhoA_ID,
      tenanT_ID: input.tenanT_ID,
      emP_NAME: input.emP_NAME,
    });
    const resultList = await loadListDoctors({
      maxResultCount: 6,
      chuyenkhoA_ID: input.chuyenkhoA_ID,
      tenanT_ID: input.tenanT_ID,
      emP_NAME: input.emP_NAME,
    });
    setListData(resultList);
    setIsLoaded(true);
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
        paramClinic={param}
        onSubmitFilter={fetchWithFilter}
        parentName={NavigationNames.DoctorListScreen}
      />
      {isLoaded && (
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
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  itemRowContainer: { paddingBottom: 14, paddingHorizontal: 8 },
});

import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ClinicItemRow, Divider, Loading } from '../../components';
import NavigationNames from '../../navigations/NavigationNames';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStoreContext } from 'stores/rootStore';
import { observer } from 'mobx-react-lite';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import { FilterDoctorModal } from '../../modals';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import reactotron from 'reactotron-react-native';
import { DM_CHUYENKHOA_ENTITY } from 'models/DM_CHUYENKHOA_ENTITY';
import { useLocalization } from '../../localization';

type TProps = {};

export const ClinicListScreen: React.FC<TProps> = observer((props) => {
  //Hook
  const rootStore = useContext(RootStoreContext);
  const { loadList: loadListClinics, totalCount } = rootStore.eC_PHONGKHAM_Store;
  const { isLoaded, setIsLoaded } = rootStore.commonStore;
  const route = useRoute();
  const { getString } = useLocalization();
  //State
  const [isFetching, setIsFetching] = useState(false);
  const [listData, setListData] = useState<EC_PHONGKHAM_ENTITY[]>([]);
  const [filterItem, setFilterItem] = useState<CM_EMPLOYEE_ENTITY>(new CM_EMPLOYEE_ENTITY());
  const [param, setParam] = useState<DM_CHUYENKHOA_ENTITY>(null);
  //Params
  const initialRun = async () => {
    //get Param
    setIsLoaded(false);
    let parseParam = new DM_CHUYENKHOA_ENTITY();
    if (route.params && route.params['param']) {
      parseParam = { ...(JSON.parse(route.params['param']) as DM_CHUYENKHOA_ENTITY) };
    }
    setParam(parseParam);
    try {
      setFilterItem({ chuyenkhoA_ID: parseParam.chuyenkhoA_ID });

      const resultList = await loadListClinics({
        chuyenkhoA_ID: parseParam.chuyenkhoA_ID,
        maxResultCount: 5,
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
    const resultList = await loadListClinics({
      maxResultCount: 5,
      skipCount: listData.length,
      chuyenkhoA_ID: filterItem.chuyenkhoA_ID,
      phongkhaM_TENDAYDU: filterItem.phongkhaM_TENDAYDU,
    });
    let tempArr = [...listData];
    tempArr = tempArr.concat(resultList);
    setListData(tempArr);
    setIsFetching(false);
  };

  const fetchWithFilter = async (input: CM_EMPLOYEE_ENTITY) => {
    setFilterItem({ ...input, phongkhaM_TENDAYDU: input.phongkhaM_TENDAYDU });
    setIsLoaded(false);
    const resultList = await loadListClinics({
      maxResultCount: 5,
      chuyenkhoA_ID: input.chuyenkhoA_ID,
      phongkhaM_TENDAYDU: input.phongkhaM_TENDAYDU,
    });
    setListData(resultList);
    setIsLoaded(true);
  };

  useEffect(() => {
    //Load data from backend
    initialRun();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FilterDoctorModal
        filterSpecialty
        paramSpecialty={param}
        filterClinic={false}
        onSubmitFilter={fetchWithFilter}
        parentName={NavigationNames.ClinicListScreen}
      />
      {isLoaded && (
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
      )}
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

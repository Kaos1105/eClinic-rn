import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Dimensions, TouchableOpacity, View, Alert } from 'react-native';
import { DepartmentItem, Loading } from '../../components';
import { useNavigation } from '@react-navigation/native';
import NavigationNames from '../../navigations/NavigationNames';
import { RootStoreContext } from 'stores/rootStore';
import { DM_CHUYENKHOA_ENTITY } from 'models/DM_CHUYENKHOA_ENTITY';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import { FilterDoctorModal } from '../../modals';
import reactotron from 'reactotron-react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;

type TProps = {};

export const DepartmentListScreen: React.FC<TProps> = (props) => {
  //Hook
  const rootStore = useContext(RootStoreContext);
  const { loadList: loadListSpecialties, totalCount } = rootStore.dM_CHUYENKHOA_Store;

  //State
  const [appLoaded, setAppLoaded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [listData, setListData] = useState<DM_CHUYENKHOA_ENTITY[]>([]);
  const [filterItem, setFilterItem] = useState<CM_EMPLOYEE_ENTITY>(new CM_EMPLOYEE_ENTITY());

  const navigation = useNavigation();

  const fetchMore = async () => {
    if (isFetching || totalCount === listData.length) return;
    setIsFetching(true);
    const resultList = await loadListSpecialties({
      maxResultCount: 8,
      skipCount: listData.length,
      chuyenkhoA_TEN: filterItem.chuyenkhoA_TEN,
    });
    let tempArr = [...listData];
    tempArr = tempArr.concat(resultList);
    setListData(tempArr);
    setIsFetching(false);
  };

  const initialRun = async () => {
    //get list data for home screen
    try {
      const resultList = await loadListSpecialties({ maxResultCount: 8 });
      setListData(resultList);
      setAppLoaded(true);
    } catch {
      Alert.alert('Error', 'Can not connect to server');
    }
  };

  const fetchWithFilter = async (input: CM_EMPLOYEE_ENTITY) => {
    setFilterItem({ ...input, chuyenkhoA_TEN: input.chuyenkhoA_TEN });
    setAppLoaded(false);
    const resultList = await loadListSpecialties({
      maxResultCount: 8,
      chuyenkhoA_TEN: input.chuyenkhoA_TEN,
    });
    setListData(resultList);
    setAppLoaded(true);
  };

  useEffect(() => {
    //Load data from backend
    initialRun();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FilterDoctorModal
        filterClinic={false}
        filterSpecialty={false}
        onSubmitFilter={fetchWithFilter}
        parentName={NavigationNames.DepartmentListScreen}
      />
      {!appLoaded ? (
        <Loading />
      ) : (
        <FlatList
          data={listData}
          onEndReachedThreshold={0.05}
          scrollEventThrottle={16}
          onEndReached={fetchMore}
          keyExtractor={(item, index) => `key${index}ForDepartment`}
          renderItem={(row) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(NavigationNames.DepartmentDetailScreen, {
                  model: JSON.stringify(row.item),
                  title: row.item.chuyenkhoA_TEN,
                })
              }
            >
              <DepartmentItem item={row.item} showShortDesc style={styles.departmentItem} />
            </TouchableOpacity>
          )}
          numColumns={2}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={isFetching ? Loading : null}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  divider: { height: 4 },
  contentContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  departmentItem: { width: SCREEN_WIDTH / 2 - 8 - 8, margin: 4 },
});

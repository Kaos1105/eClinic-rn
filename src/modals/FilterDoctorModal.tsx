import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { ReactNativeModal } from 'react-native-modal';
import { useLocalization } from '../localization';
import { Theme } from '../theme';
import { Button } from '../components/buttons/Button';
import { Divider, Loading } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStoreContext } from 'stores/rootStore';
import { observer } from 'mobx-react-lite';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import { DM_CHUYENKHOA_ENTITY } from 'models/DM_CHUYENKHOA_ENTITY';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import reactotron from 'reactotron-react-native';
import { color } from 'react-native-reanimated';
import NavigationNames from 'navigations/NavigationNames';
interface TProps {
  filterClinic?: boolean;
  paramClinic?: EC_PHONGKHAM_ENTITY;
  filterSpecialty?: boolean;
  paramSpecialty?: DM_CHUYENKHOA_ENTITY;
  onSubmitFilter: (input: CM_EMPLOYEE_ENTITY) => void;
  parentName: string;
}

const ICON_TOP = 8;

export const FilterDoctorModal: React.FC<TProps> = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const [componentLoaded, setComponentLoaded] = useState(false);
  const { loadList: loadListClinics, totalCount: clinicsCount } = rootStore.eC_PHONGKHAM_Store;
  const { loadList: loadListSpecialties, totalCount: specialtiesCount } =
    rootStore.dM_CHUYENKHOA_Store;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listClinics, setListClinics] = useState<EC_PHONGKHAM_ENTITY[]>([]);
  const [listSpecialties, setListSpecialties] = useState<DM_CHUYENKHOA_ENTITY[]>([]);
  const [isFetchingClinic, setIsFetchingClinic] = useState(false);
  const [isFetchingSpecialty, setIsFetchingSpecialty] = useState(false);

  const [filterItem, setFilterItem] = useState<CM_EMPLOYEE_ENTITY>(new CM_EMPLOYEE_ENTITY());

  const { getString } = useLocalization();

  const searchPlaceholder = () => {
    switch (props.parentName) {
      case NavigationNames.ClinicListScreen:
        return getString('Clinic name');
      case NavigationNames.DepartmentListScreen:
        return getString('Specialty name');
      case NavigationNames.DoctorListScreen:
        return getString('Doctor name');
      default:
        break;
    }
  };

  const setFilterName = (searchText: string) => {
    let tempFilterItem = new CM_EMPLOYEE_ENTITY();
    switch (props.parentName) {
      case NavigationNames.ClinicListScreen:
        tempFilterItem = {
          ...filterItem,
          phongkhaM_TENDAYDU: searchText,
        };
        break;
      case NavigationNames.DepartmentListScreen:
        tempFilterItem = {
          ...filterItem,
          chuyenkhoA_TEN: searchText,
        };
        break;
      case NavigationNames.DoctorListScreen:
        tempFilterItem = {
          ...filterItem,
          emP_NAME: searchText,
        };
        break;
      default:
        break;
    }
    setFilterItem(tempFilterItem);
    props.onSubmitFilter(tempFilterItem);
  };

  const setParamClinic = () => {
    if (props.paramClinic) {
      setFilterItem({
        tenanT_ID: props.paramClinic.phongkhaM_ID,
        phongkhaM_TEN: props.paramClinic.phongkhaM_TENDAYDU,
      });
    }
  };

  const setParamSpecialty = () => {
    if (props.paramSpecialty) {
      setFilterItem({
        chuyenkhoA_ID: props.paramSpecialty.chuyenkhoA_ID,
        chuyenkhoA_TEN: props.paramSpecialty.chuyenkhoA_TEN,
      });
    }
  };

  const initialRun = async () => {
    //get list data for home screen
    try {
      if (props.filterClinic) {
        const clinicsList = await loadListClinics({
          maxResultCount: 4,
        });
        setListClinics(clinicsList);
      }
      if (props.filterSpecialty) {
        const specialtiesList = await loadListSpecialties({ maxResultCount: 4 });
        setListSpecialties(specialtiesList);
      }
      setComponentLoaded(true);
    } catch {
      Alert.prompt('Lỗi', 'Không thể kết nối đến server');
    }
  };

  const fetchMoreClinic = async () => {
    if (isFetchingClinic || clinicsCount === listClinics.length) return;
    setIsFetchingClinic(true);
    const resultList = await loadListClinics({ maxResultCount: 5, skipCount: listClinics.length });
    let tempArr = [...listClinics];
    tempArr = tempArr.concat(resultList);
    setListClinics(tempArr);
    setIsFetchingClinic(false);
  };

  const fetchMoreSpecialty = async () => {
    if (isFetchingSpecialty || specialtiesCount === listSpecialties.length) return;
    setIsFetchingSpecialty(true);
    const resultList = await loadListSpecialties({
      maxResultCount: 4,
      skipCount: listSpecialties.length,
    });
    let tempArr = [...listSpecialties];
    tempArr = tempArr.concat(resultList);
    setListSpecialties(tempArr);
    setIsFetchingSpecialty(false);
  };

  //UseEffect

  useEffect(() => {
    //Load data from backend
    initialRun();
  }, []);

  useEffect(() => {
    setParamClinic();
  }, [props.paramClinic]);

  useEffect(() => {
    setParamSpecialty();
  }, [props.paramSpecialty]);

  if (!componentLoaded) {
    return (
      <View style={{ maxHeight: 100, paddingTop: 20 }}>
        <Loading color='gray' />
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View style={{ flex: 9, justifyContent: 'center' }}>
            <TextInput
              placeholder={searchPlaceholder()}
              style={styles.searchTextInput}
              onSubmitEditing={(e) => {
                setFilterName(e.nativeEvent.text);
              }}
            />
            <Ionicons name='search' size={18} color='black' style={styles.searchIcon} />
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={() => setIsModalVisible(true)}>
            <Ionicons name='filter' style={{ marginHorizontal: 5 }} size={20} color='black' />
            <Text>{getString('Filter')}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', paddingHorizontal: 10, flexWrap: 'wrap' }}>
          {filterItem.chuyenkhoA_TEN && props.filterSpecialty ? (
            <Text style={styles.previewFilterTag}>
              {filterItem.chuyenkhoA_TEN}
              <Ionicons name='checkmark' size={14} color='white' />
            </Text>
          ) : null}
          {filterItem.phongkhaM_TEN && props.filterClinic ? (
            <Text style={styles.previewFilterTag}>
              {filterItem.phongkhaM_TEN}
              <Ionicons name='checkmark' size={14} color='white' />
            </Text>
          ) : null}
        </View>
      </View>

      <View style={{ width: '100%' }}>
        <ReactNativeModal
          propagateSwipe
          isVisible={isModalVisible}
          style={styles.modalView}
          onBackdropPress={() => setIsModalVisible(false)}
        >
          <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.filterHeader}>
              <View style={styles.filterItemWrapper}>
                {filterItem.chuyenkhoA_TEN && (
                  <Text style={styles.filterTag}>
                    {filterItem.chuyenkhoA_TEN}
                    <Ionicons name='checkmark' size={18} color='white' />
                  </Text>
                )}
                {filterItem.phongkhaM_TEN && (
                  <Text style={styles.filterTag}>
                    {filterItem.phongkhaM_TEN}
                    <Ionicons name='checkmark' size={18} color='white' />
                  </Text>
                )}
              </View>
              <Ionicons
                name='backspace-outline'
                style={styles.closeButton}
                size={35}
                color='black'
                onPress={() => setIsModalVisible(false)}
              />
            </View>
            <ScrollView style={styles.filterContainer}>
              {props.filterSpecialty && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>{getString('Specialty')}</Text>
                  <Divider />
                  <View style={styles.filterListWrapper}>
                    {listSpecialties.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={
                          item.chuyenkhoA_ID === filterItem.chuyenkhoA_ID
                            ? [styles.filterItem, styles.filterSelectedItem]
                            : styles.filterItem
                        }
                        onPress={() => {
                          setFilterItem({
                            ...filterItem,
                            chuyenkhoA_ID: item.chuyenkhoA_ID,
                            chuyenkhoA_TEN: item.chuyenkhoA_TEN,
                          });
                        }}
                      >
                        <Text
                          style={
                            item.chuyenkhoA_ID === filterItem.chuyenkhoA_ID
                              ? { color: 'white' }
                              : { color: 'black' }
                          }
                        >
                          {item.chuyenkhoA_TEN}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {specialtiesCount !== listSpecialties.length && (
                    <Button
                      disabled={isFetchingSpecialty}
                      style={{ paddingHorizontal: 5, paddingVertical: 3, alignSelf: 'center' }}
                      title={getString('See More')}
                      onPress={fetchMoreSpecialty}
                    />
                  )}
                </View>
              )}
              {props.filterClinic && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>{getString('Clinic')}</Text>
                  <Divider />
                  <View style={styles.filterListWrapper}>
                    {listClinics.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={
                          item.phongkhaM_ID === filterItem.tenanT_ID
                            ? [styles.filterItem, styles.filterSelectedItem]
                            : styles.filterItem
                        }
                        onPress={() => {
                          setFilterItem({
                            ...filterItem,
                            tenanT_ID: item.phongkhaM_ID,
                            phongkhaM_TEN: item.phongkhaM_TENDAYDU,
                          });
                        }}
                      >
                        <Text
                          style={
                            item.phongkhaM_ID === filterItem.tenanT_ID
                              ? { color: 'white' }
                              : { color: 'black' }
                          }
                        >
                          {item.phongkhaM_TENDAYDU}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {clinicsCount !== listClinics.length && (
                    <Button
                      disabled={isFetchingClinic}
                      style={{ paddingHorizontal: 5, paddingVertical: 3, alignSelf: 'center' }}
                      title={getString('See More')}
                      onPress={fetchMoreClinic}
                    />
                  )}
                </View>
              )}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button
                  title={getString('CONFIRM')}
                  onPress={() => {
                    setIsModalVisible(false);
                    props.onSubmitFilter(filterItem);
                  }}
                />
                <Button
                  title={getString('RESET')}
                  type='outline'
                  onPress={() => {
                    setFilterItem(new CM_EMPLOYEE_ENTITY());
                    setIsModalVisible(false);
                    props.onSubmitFilter(new CM_EMPLOYEE_ENTITY());
                  }}
                />
              </View>
            </View>
          </SafeAreaView>
        </ReactNativeModal>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: { elevation: 10, backgroundColor: 'white', padding: 2 },
  searchBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  searchTextInput: {
    backgroundColor: '#ebebeb',
    padding: 5,
    paddingLeft: 40,
    borderRadius: 20,
  },
  searchIcon: { position: 'absolute', top: ICON_TOP, left: 15 },
  filterButton: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  safeAreaContainer: {
    height: '65%',
    backgroundColor: 'white',
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  buttonContainer: {
    padding: 24,
  },
  filterContainer: {
    flexDirection: 'column',
  },
  sectionContainer: { paddingHorizontal: 16, marginTop: 12 },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    paddingVertical: 8,
    color: Theme.colors.primaryColorDark,
  },
  filterItem: {
    borderWidth: 1,
    width: '48%',
    padding: 4,
    borderRadius: 10,
    borderColor: Theme.colors.primaryColorDark,
    margin: 2,
    marginBottom: 10,
  },
  filterSelectedItem: {
    backgroundColor: Theme.colors.primaryColor,
  },
  filterItemWrapper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  previewFilterTag: {
    margin: 2,
    padding: 2,
    fontSize: 12,
    borderRadius: 10,
    backgroundColor: Theme.colors.tintColor,
  },
  filterTag: {
    margin: 5,
    marginLeft: 15,
    borderRadius: 10,
    backgroundColor: Theme.colors.tintColor,
    padding: 5,
  },
  filterListWrapper: {
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Theme.colors.gray,
    borderBottomWidth: 1,
  },
  closeButton: { alignSelf: 'flex-start', marginHorizontal: 10 },
});

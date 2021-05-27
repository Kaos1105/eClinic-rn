import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';
import { useLocalization } from '../localization';
import { Theme } from '../theme';
import { Button } from '../components/buttons/Button';
import { Divider, Loading } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStoreContext } from 'stores/rootStore';
import { observer } from 'mobx-react-lite';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import { DM_CHUYENKHOA_ENTITY } from 'models/DM_CHUYENKHOA_ENTITY';
interface TProps {
  filterClinic?: boolean;
  filterSpecialty?: boolean;
  onSubmitFilter: () => void;
}

const ICON_TOP = 8;

export const FilterDoctorModal: React.FC<TProps> = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const [appLoaded, setAppLoaded] = useState(false);
  const { loadList: loadListClinics, totalCount: clinicsCount } = rootStore.eC_PHONGKHAM_Store;
  const { loadList: loadListSpecialties, totalCount: specialtiesCount } =
    rootStore.dM_CHUYENKHOA_Store;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listClinics, setListClinics] = useState<EC_PHONGKHAM_ENTITY[]>([]);
  const [listSpecialties, setListSpecialties] = useState<DM_CHUYENKHOA_ENTITY[]>([]);
  const [isFetchingClinic, setIsFetchingClinic] = useState(false);
  const [isFetchingSpecialty, setIsFetchingSpecialty] = useState(false);

  const { getString } = useLocalization();

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
        const specialtiesList = await loadListSpecialties({
          maxResultCount: 4,
        });
        setListSpecialties(specialtiesList);
      }
      setAppLoaded(true);
    } catch {
      Alert.prompt('Error', 'Can not connect to server');
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

  useEffect(() => {
    //Load data from backend
    initialRun();
  }, []);

  if (!appLoaded) {
    return <Loading />;
  }
  return (
    <>
      <View style={styles.searchBar}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput style={styles.searchTextInput} />
          <Ionicons name='search' size={18} color='black' style={styles.searchIcon} />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsModalVisible(true)}>
          <Ionicons name='filter' style={{ marginHorizontal: 5 }} size={20} color='black' />
          <Text>Filter</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%' }}>
        <ReactNativeModal
          propagateSwipe
          isVisible={isModalVisible}
          style={styles.modalView}
          onBackdropPress={() => setIsModalVisible(false)}
        >
          <SafeAreaView style={styles.safeAreaContainer}>
            <Ionicons
              name='backspace-outline'
              style={{ alignSelf: 'flex-end', marginHorizontal: 10 }}
              size={35}
              color='black'
              onPress={() => setIsModalVisible(false)}
            />
            <ScrollView style={styles.filterContainer}>
              {props.filterSpecialty && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Specialty</Text>
                  <Divider />
                  <View
                    style={{
                      paddingTop: 10,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    {listSpecialties.map((item, index) => (
                      <View key={index} style={styles.filterItem}>
                        <Text>{item.chuyenkhoA_TEN}</Text>
                      </View>
                    ))}
                  </View>
                  {specialtiesCount !== listSpecialties.length && (
                    <Button
                      disabled={isFetchingSpecialty}
                      style={{ paddingHorizontal: 5, paddingVertical: 3, alignSelf: 'center' }}
                      title='Show more'
                      onPress={fetchMoreSpecialty}
                    />
                  )}
                </View>
              )}
              {props.filterClinic && (
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Clinic</Text>
                  <Divider />
                  <View
                    style={{
                      paddingTop: 10,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                    }}
                  >
                    {listClinics.map((item, index) => (
                      <View key={index} style={styles.filterItem}>
                        <Text>{item.phongkhaM_TENDAYDU}</Text>
                      </View>
                    ))}
                  </View>
                  {clinicsCount !== listClinics.length && (
                    <Button
                      disabled={isFetchingClinic}
                      style={{ paddingHorizontal: 5, paddingVertical: 3, alignSelf: 'center' }}
                      title='Show more'
                      onPress={fetchMoreClinic}
                    />
                  )}
                </View>
              )}
            </ScrollView>
            <View style={styles.buttonContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Button title={getString('CONFIRM')} onPress={() => setIsModalVisible(false)} />
                <Button title={getString('CANCEL')} type='outline' />
              </View>
            </View>
          </SafeAreaView>
        </ReactNativeModal>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
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
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 10,
    borderColor: Theme.colors.primaryColorDark,
    margin: 2,
    marginBottom: 10,
  },
});

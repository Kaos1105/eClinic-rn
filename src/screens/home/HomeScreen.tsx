import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  UpcomingAppoinmentRow,
  DashboardMenuItemRow,
  Divider,
  SectionHeader,
  DashboardClinicsListItem,
  DoctorItemRow,
  DepartmentItem,
  TouchableHighlight,
  Loading,
} from '../../components';
import { DashboardItemsModel } from '../../models-demo';
import { DashboardService } from '../../services-demo';
import { useLocalization } from '../../localization';
import NavigationNames from '../../navigations/NavigationNames';
import { HomeMenuItemType } from '../../types';
import { RootStoreContext } from 'stores/rootStore';
import Reactotron from 'reactotron-react-native';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';

const generateMenuItems = (getString: (key: string) => string): HomeMenuItemType[] => [
  {
    row1: getString('Book an Appoinment'),
    row2: getString('6 Doctors are available'),
    iconName: 'md-alarm',
    iconBack: '#73CEC1',
    action: 'BookAnAppoinment',
  },
  // {
  //   row1: getString('Lab Tests at Home'),
  //   row2: getString('92 Diagnostics are available'),
  //   iconName: 'ios-flask',
  //   iconBack: '#35CDF7',
  //   action: 'LabTestsAtHome',
  // },
  // {
  //   row1: getString('Online Healt Consultant'),
  //   row2: getString('+14 Consultants'),
  //   iconName: 'ios-text',
  //   iconBack: '#FA7F5D',
  //   action: 'OnlineHealtConsultant',
  // },
];

type TProps = {};

export const HomeScreen: React.FC<TProps> = (props) => {
  const rootStore = useContext(RootStoreContext);
  const [appLoaded, setAppLoaded] = useState(false);
  const { loadList: loadListClinics } = rootStore.eC_PHONGKHAM_Store;
  const { loadList: loadListDoctors } = rootStore.cM_EMPLOYEE_Store;
  const navigation = useNavigation();
  const { getString, changeLanguage } = useLocalization();
  const [dashboardItem, setDashboardItem] = useState<DashboardItemsModel>(null);
  const [listClinics, setListClinics] = useState<EC_PHONGKHAM_ENTITY[]>([]);
  const [listDoctors, setListDoctors] = useState<CM_EMPLOYEE_ENTITY[]>([]);

  const initialRun = async () => {
    //get list data for home screen
    try {
      const clinicList = await loadListClinics({ maxResultCount: 4 });
      setListClinics(clinicList);
      const doctorList = await loadListDoctors({ maxResultCount: 4 });
      setListDoctors(doctorList);
      setAppLoaded(true);
    } catch {
      Alert.prompt('Error', 'Can not connect to server');
    }
  };

  useEffect(() => {
    //Load data from backend
    initialRun();
  }, []);

  useEffect(() => {
    DashboardService.getDashboardItems().then((item) => {
      setDashboardItem(item);
    });
  }, []);

  const onClickMenu = (item: HomeMenuItemType) => {
    switch (item.action) {
      case 'BookAnAppoinment':
        navigation.navigate(NavigationNames.NewAppointmentScreen);
        break;
      // case 'LabTestsAtHome':
      //   navigation.navigate(NavigationName);
      //   break;
      // case 'OnlineHealtConsultant':
      //   navigation.navigate(NavigationName);
      //   break;
    }
  };

  if (dashboardItem === null || !appLoaded) {
    return <Loading />;
  }

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <UpcomingAppoinmentRow
          style={styles.upcomingAppoinmentRow}
          item={dashboardItem.appointment}
        />
        <SectionHeader title={getString('What are you looking for?')} />
        {/* <FlatList
          data={generateMenuItems(getString)}
          keyExtractor={(item, index) => `key${index}ForMenu`}
          renderItem={(row) => (
            <TouchableHighlight onPress={() => onClickMenu(row.item)}>
              <DashboardMenuItemRow item={row.item} />
            </TouchableHighlight>
          )}
          ItemSeparatorComponent={() => <Divider h16 />}
          scrollEnabled={false}
        /> */}
        {generateMenuItems(getString).map((row) => (
          <View key={row.iconName}>
            <TouchableHighlight onPress={() => onClickMenu(row)}>
              <DashboardMenuItemRow item={row} />
            </TouchableHighlight>
            <Divider h16 />
          </View>
        ))}
        <SectionHeader
          title={getString('Clinics')}
          rightTitle={getString('See More')}
          rightAction={() => navigation.navigate(NavigationNames.ClinicListScreen)}
        />
        <FlatList
          data={listClinics}
          renderItem={(row) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(NavigationNames.ClinicDetailScreen, {
                  model: JSON.stringify(row.item),
                  title: row.item.phongkhaM_TENDAYDU,
                })
              }
            >
              <DashboardClinicsListItem item={row.item} />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={styles.horizontalDivider} />}
          contentContainerStyle={styles.campaignsContainer}
          keyExtractor={(item, index) => `key${index}Clinic`}
        />
        <SectionHeader
          title={getString('All Specialists')}
          rightTitle={getString('See More')}
          rightAction={() => navigation.navigate(NavigationNames.DoctorListScreen)}
        />
        <FlatList
          data={listDoctors}
          keyExtractor={(item, index) => `key${index}ForDoctor`}
          renderItem={(row) => <DoctorItemRow item={row.item} />}
          contentContainerStyle={styles.doctorsContainer}
          ItemSeparatorComponent={() => <View style={styles.horizontalDivider} />}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        />
        <SectionHeader
          title={getString('Our Departments')}
          rightTitle={getString('See More')}
          rightAction={() => navigation.navigate(NavigationNames.DepartmentListScreen)}
        />
        <FlatList
          data={dashboardItem.departments}
          renderItem={(row) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(NavigationNames.DepartmentDetailScreen, {
                  model: JSON.stringify(row.item),
                })
              }
            >
              <DepartmentItem item={row.item} style={{ minWidth: 130 }} />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          ItemSeparatorComponent={() => <View style={styles.horizontalDivider} />}
          keyExtractor={(item, index) => `key${index}ForDepartment`}
          contentContainerStyle={styles.departmentsContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
  },
  upcomingAppoinmentRow: {
    marginHorizontal: 16,
  },
  doctorsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  campaignsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  departmentsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalDivider: { width: 12 },
});

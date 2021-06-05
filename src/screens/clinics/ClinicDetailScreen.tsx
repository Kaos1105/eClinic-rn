import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking, Alert } from 'react-native';
import { Theme } from '../../theme';
import { Button, Divider, Loading, Map } from '../../components';
import { useLocalization } from '../../localization';
import { useNavigation, useRoute } from '@react-navigation/native';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import AppConsts from '../../lib/appconst';
import { Ionicons } from '@expo/vector-icons';
import { RootStoreContext } from 'stores/rootStore';
import { ICoordinateModel } from 'models/MapGeocoding';
import agent from 'service/api/agent';
import NavigationNames from 'navigations/NavigationNames';
import { observer } from 'mobx-react-lite';

type TProps = {};

export const ClinicDetailScreen: React.FC<TProps> = observer((props) => {
  //Hook
  const rootStore = useContext(RootStoreContext);
  const { currentUserLocation, getUserLocation } = rootStore.usersStore;
  const { isLoaded, setIsLoaded } = rootStore.commonStore;
  const { getString } = useLocalization();
  const route = useRoute();
  const navigation = useNavigation();

  //State
  const [clinicLocation, setClinicLocation] = useState<ICoordinateModel>(undefined);
  const [clinicAddress, setClinicAddress] = useState('');
  const [distanceToClinic, setDistanceToClinic] = useState('');

  const model = JSON.parse(route.params['model']) as EC_PHONGKHAM_ENTITY;

  const initialRun = async () => {
    //get user location
    try {
      if (!currentUserLocation) {
        setIsLoaded(false);
        let location = await getUserLocation();
        let clinicById = await agent.EC_PHONGKHAM_API.details(
          model.phongkhaM_ID,
          location.lat.toString(),
          location.lng.toString()
        );
        setDistanceToClinic(clinicById.maP_INFO.distance.text);
      }
      let result = await agent.MapGeocoding.getCoordinate(model.diachI_1);
      if (result) {
        setClinicLocation(result.geometry.location);
        setClinicAddress(result.formatted_address);
      } else {
        Alert.alert('Location can not be found');
      }
    } catch {}
    setIsLoaded(true);
  };

  useEffect(() => {
    //Load data from backend
    initialRun();
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: `${AppConsts.remoteServiceBaseUrl}/${model.hinhdaidien}` }}
          style={styles.image}
        />
        <Text style={styles.doctorInfoFullName}>{model.phongkhaM_TENDAYDU}</Text>
        <Text style={styles.doctorInfoTitle}>{model.chuyenkhoA_TEN}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Info</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Ionicons name='person' color={Theme.colors.tintColor} size={18} />
            <Text style={styles.textInfo}>{model.bacsy}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='call' color={Theme.colors.tintColor} size={18} />
            <Text style={styles.textInfo}>{model.hotline}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='location' color={Theme.colors.tintColor} size={18} />
            <Text style={styles.textInfo}>{model.diachI_1}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='car' color={Theme.colors.tintColor} size={18} />
            <Text style={styles.textInfo}>{distanceToClinic}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='globe-outline' color={Theme.colors.tintColor} size={18} />
            <Text
              style={{ ...styles.textInfo, color: 'blue' }}
              onPress={() => Linking.openURL(model.website)}
            >
              {model.website}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='mail' color={Theme.colors.tintColor} size={18} />
            <Text style={styles.textInfo}>{model.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name='logo-facebook' color={Theme.colors.tintColor} size={18} />
            <Text
              style={{ ...styles.textInfo, color: 'blue' }}
              onPress={() => Linking.openURL(model.facebook)}
            >
              {model.facebook}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Details</Text>
        <Divider />
        <Text style={styles.aboutText}>{model.gioithieu}</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Map
          currentUserLocation={currentUserLocation}
          targetLocation={clinicLocation}
          targetTitle={clinicAddress}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Doctors</Text>
        <Divider />
        <Button
          title='Doctor list screen'
          onPress={() => {
            navigation.navigate(NavigationNames.DoctorListScreen, {
              param: JSON.stringify(model),
            });
          }}
        />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    paddingVertical: 8,
  },
  imageWrapper: {
    height: 120,
    backgroundColor: Theme.colors.grayForBoxBackground,
    borderRadius: 12,
  },
  image: { flex: 1, borderRadius: 12, width: 180, height: 180 },
  headerContainer: { paddingHorizontal: 16, alignItems: 'center' },
  doctorPreviewImage: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderWidth: 0.5,
    borderColor: Theme.colors.primaryColor,
  },
  doctorInfoFullName: {
    fontSize: 19,
    fontWeight: '600',
    color: Theme.colors.black,
    marginTop: 22,
  },
  doctorInfoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Theme.colors.gray,
    marginTop: 6,
  },
  divider: { marginHorizontal: 0, marginVertical: 12 },
  sectionContainer: { paddingHorizontal: 16, marginTop: 12 },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 15,
    paddingVertical: 8,
    color: Theme.colors.primaryColorDark,
  },
  aboutText: {
    paddingVertical: 8,
    color: Theme.colors.black,
    fontSize: 15,
  },
  infoContainer: {
    width: '100%',
    elevation: 4,
    backgroundColor: 'white',
    borderColor: Theme.colors.black,
    borderRadius: 10,
  },
  infoRow: { flexDirection: 'row', padding: 5 },
  textInfo: {
    marginLeft: 8,
    flexShrink: 1,
  },
});

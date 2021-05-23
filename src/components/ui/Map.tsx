import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, ViewStyle, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Theme } from '../../theme';

interface IProps {
  targetTitle?: string;
  targetLocation?: {
    lat: number;
    lng: number;
  };
  currentUserLocation?: {
    lat: number;
    lng: number;
  };
}

export const Map = ({ targetLocation, currentUserLocation, targetTitle }: IProps) => {
  const mapRegion = {
    latitude: targetLocation?.lat ?? 10.7784,
    longitude: targetLocation?.lng ?? 106.6949,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView style={styles.map} region={mapRegion}>
      {targetLocation && (
        <Marker
          key={targetTitle}
          coordinate={{ latitude: targetLocation.lat, longitude: targetLocation.lng }}
          title={targetTitle}
        />
      )}
      {currentUserLocation && (
        <Marker
          key={'CurrentUserLocation'}
          coordinate={{ latitude: currentUserLocation.lat, longitude: currentUserLocation.lng }}
          title={'Current location'}
        >
          <Ionicons name='person' color={Theme.colors.primaryColorDark} size={20} />
        </Marker>
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: 250,
  },
});

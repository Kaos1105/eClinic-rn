import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../avatar';
import { AppointmentModel } from '../../models-demo/AppointmentModel';
import moment from 'moment';

type TProps = {
  style?: ViewStyle;
  item: AppointmentModel;
};

export const UpcomingAppoinmentRow: React.FC<TProps> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Avatar
        source={{
          uri: props.item.doctor.imageUrl,
        }}
        status={props.item.doctor.isOnline ? 'online' : 'bussy'}
      />
      <View style={styles.rows}>
        <Text style={styles.titleText}>{props.item.title}</Text>
        <Text style={styles.doctorNameText}>{props.item.doctor.fullName}</Text>
        <Text style={styles.locationText}>
          {`${moment(props.item.appointmentDate).format('LT')} ${props.item.locationName}`}
        </Text>
      </View>
      <View style={styles.notification}>
        <Ionicons name='ios-notifications' color='white' size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.grayForBoxBackground,
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
  },
  rows: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  doctorNameText: {
    marginTop: 3,
    fontSize: 14,
    color: Theme.colors.gray,
  },
  locationText: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.gray,
  },
  notification: {
    width: 26,
    height: 26,
    marginTop: 2,
    marginEnd: 2,
    backgroundColor: '#F93C1A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

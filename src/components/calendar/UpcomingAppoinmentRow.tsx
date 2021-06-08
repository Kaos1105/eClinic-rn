import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../avatar';
import moment from 'moment';
import { EC_BOOKING_ENTITY } from 'models/EC_BOOKING_ENTITY';
import agent from 'service/api/agent';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import AppConsts from '../../lib/appconst';

type TProps = {
  style?: ViewStyle;
  item: EC_BOOKING_ENTITY;
};

export const UpcomingAppoinmentRow: React.FC<TProps> = (props) => {
  const [clinic, setClinic] = useState<EC_PHONGKHAM_ENTITY>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (props.item?.tenanT_ID) {
      agent.EC_PHONGKHAM_API.details(props.item.tenanT_ID).then((result) => {
        setClinic(result);
        setIsLoaded(true);
      });
    }
  }, [props.item?.tenanT_ID]);

  return (
    <View style={[styles.container, props.style]}>
      <Avatar source={{ uri: `${AppConsts.remoteServiceBaseUrl}/${clinic.hinhdaidien}` }} />
      <View style={styles.rows}>
        <Text style={styles.titleText}>{props.item.trangthaI_NAME}</Text>
        <Text style={styles.doctorNameText}>{props.item.tenBacSi}</Text>
        <Text style={styles.doctorNameText}>{clinic.phongkhaM_TENDAYDU}</Text>
        <Text style={styles.locationText}>
          {`${moment(props.item.ngaybookfrom).format('DD/MM/YYYY HH:mm')}`}
        </Text>
        <Text style={styles.locationText}>{clinic.diachI_1}</Text>
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

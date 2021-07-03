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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import NavigationNames from 'navigations/NavigationNames';
import { useLocalization } from '../../localization';

type TProps = {
  style?: ViewStyle;
  item: EC_BOOKING_ENTITY;
};

export const UpcomingAppointmentRow: React.FC<TProps> = (props) => {
  //Hook
  const navigation = useNavigation();
  const { getString } = useLocalization();

  const [clinic, setClinic] = useState<EC_PHONGKHAM_ENTITY>(null);

  useEffect(() => {
    if (props.item?.tenanT_ID) {
      agent.EC_PHONGKHAM_API.details(props.item.tenanT_ID).then((result) => {
        setClinic(result);
      });
    }
  }, [props.item?.tenanT_ID]);

  if (props.item === null || clinic === null)
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Ionicons name='medical' size={24} color={Theme.colors.tintColor} />
        <Text style={{ paddingLeft: 10 }}>{getString('There is no new Appointment')}</Text>
      </View>
    );

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={() => {
        navigation.navigate(NavigationNames.CalendarTab, {
          screen: NavigationNames.CalendarScreen,
          params: { model: JSON.stringify(props.item) },
        });
      }}
    >
      <Avatar
        source={{
          uri: `${AppConsts.remoteServiceBaseUrl}/${clinic.hinhdaidien.replace('wwwroot/', '')}`,
        }}
      />
      <View style={styles.rows}>
        <Text style={styles.titleText}>{props.item.trangthaI_NAME}</Text>
        <Text style={[styles.doctorNameText, { fontWeight: 'bold' }]}>{props.item.tenBacSi}</Text>
        <Text style={styles.doctorNameText}>{clinic.phongkhaM_TENDAYDU}</Text>
        <Text style={[styles.locationText, { color: Theme.colors.calendarItem.timeColor }]}>
          {`${moment(props.item.ngaybookfrom).format('DD/MM/YYYY HH:mm')}`}
        </Text>
        <Text style={styles.locationText}>{clinic.diachI_1}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.grayForBoxBackground,
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
  },
  emptyContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  rows: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.primaryColorDark,
  },
  doctorNameText: {
    marginTop: 3,
    fontSize: 14,
    color: Theme.colors.black,
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

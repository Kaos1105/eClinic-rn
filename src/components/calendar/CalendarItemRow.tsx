import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import moment from 'moment';
import { AppointmentModel } from '../../models-demo';
import { Theme } from '../../theme';

type TProps = {
  item: AppointmentModel;
  style?: ViewStyle;
};

export const CalendarItemRow: React.FC<TProps> = (props) => {
  return (
    <View style={[styles.root, props.style]}>
      <View style={styles.leftEffect} />
      <View style={styles.textContent}>
        <Text style={styles.textTitle}>{props.item.title}</Text>
        <Text style={styles.textDoctor}>{props.item.doctor.fullName}</Text>
        <Text style={styles.textDate}>
          {moment(props.item.appointmentDate).format('MM/DD/YYYY dddd')}
        </Text>
      </View>
      <View style={styles.timeContent}>
        <Text style={styles.textTime}>{moment(props.item.appointmentDate).format('LT')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
    backgroundColor: Theme.colors.calendarItem.backgroundColor,
    marginStart: 16,
    marginEnd: 16,
    flexDirection: 'row',
  },
  leftEffect: {
    borderTopStartRadius: 4,
    borderBottomStartRadius: 4,
    width: 4,
    height: '100%',
    backgroundColor: Theme.colors.calendarItem.leftColor,
  },
  textContent: {
    flex: 1,
    paddingStart: 16,
    paddingEnd: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  textTitle: { fontWeight: '600', fontSize: 17, color: Theme.colors.black },
  textDoctor: {
    color: Theme.colors.gray,
    marginTop: 6,
    fontSize: 13,
    fontWeight: 'bold',
  },
  textDate: { color: Theme.colors.gray, marginTop: 6, fontSize: 14 },
  timeContent: {
    flexDirection: 'column',
    paddingEnd: 16,
    alignSelf: 'center',
    alignItems: 'flex-end',
  },
  textTime: {
    fontSize: 25,
    fontWeight: '600',
    color: Theme.colors.calendarItem.timeColor,
  },
});

import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import moment from 'moment';
import { AppointmentModel } from '../../models-demo';
import { Theme } from '../../theme';
import { EC_BOOKING_ENTITY } from 'models/EC_BOOKING_ENTITY';
import reactotron from 'reactotron-react-native';

type TProps = {
  item: EC_BOOKING_ENTITY;
  style?: ViewStyle;
};

const appointmentStatusConst = {
  finished: 'DKB',
  cancel: 'HL',
  unfinished: 'CKB',
};

const getRootStyleStatus = (status: string) => {
  switch (status) {
    case appointmentStatusConst.cancel:
      return [styles.root, styles.rootCancel];
    case appointmentStatusConst.finished:
      return [styles.root, styles.rootDone];
    case appointmentStatusConst.unfinished:
      return [styles.root];
  }
};

const getLeftEffectStyleStatus = (status: string) => {
  switch (status) {
    case appointmentStatusConst.cancel:
      return [styles.leftEffect, styles.leftEffectCancel];
    case appointmentStatusConst.finished:
      return [styles.leftEffect, styles.leftEffectDone];
    case appointmentStatusConst.unfinished:
      return [styles.leftEffect];
  }
};

const getTimeStyleStatus = (status: string) => {
  switch (status) {
    case appointmentStatusConst.cancel:
      return [styles.textTime, styles.textTimeCancel];
    case appointmentStatusConst.finished:
      return [styles.textTime, styles.textTimeDone];
    case appointmentStatusConst.unfinished:
      return [styles.textTime];
  }
};

export const CalendarItemRow: React.FC<TProps> = (props) => {
  return (
    <View style={getRootStyleStatus(props.item.trangthai)}>
      <View style={getLeftEffectStyleStatus(props.item.trangthai)} />
      <View style={styles.textContent}>
        <Text style={styles.textTitle}>{props.item.trangthaI_NAME}</Text>
        <Text style={styles.textDoctor}>{props.item.tenBacSi}</Text>
        <Text style={styles.textDate}>
          {moment(props.item.ngaybookfrom).format('DD/MM/YYYY dddd')}
        </Text>
      </View>
      <View style={styles.timeContent}>
        <Text style={getTimeStyleStatus(props.item.trangthai)}>
          {moment(props.item.ngaybookfrom).format('LT')}
        </Text>
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
  rootDone: {
    backgroundColor: Theme.colors.calendarItemDone.backgroundColor,
  },
  rootCancel: {
    backgroundColor: Theme.colors.calendarItemCancel.backgroundColor,
  },
  leftEffect: {
    borderTopStartRadius: 4,
    borderBottomStartRadius: 4,
    width: 4,
    height: '100%',
    backgroundColor: Theme.colors.calendarItem.leftColor,
  },
  leftEffectDone: {
    backgroundColor: Theme.colors.calendarItemDone.leftColor,
  },
  leftEffectCancel: {
    backgroundColor: Theme.colors.calendarItemCancel.leftColor,
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
  textTimeDone: {
    color: Theme.colors.calendarItemDone.timeColor,
  },
  textTimeCancel: {
    color: Theme.colors.calendarItemCancel.timeColor,
  },
});

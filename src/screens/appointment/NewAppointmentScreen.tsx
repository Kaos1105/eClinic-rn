import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider, DoctorItemRow, Button } from '../../components';
import { ConfirmAppointmentModal } from '../../modals';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import ReactNativeModal from 'react-native-modal';
import { AppointmentTimeModal } from '../../models-demo';
import { useLocalization } from '../../localization';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import { ScrollView } from 'react-native-gesture-handler';
import { da } from 'date-fns/locale';

type TProps = {};

const SCREEN_WIDTH = Dimensions.get('screen').width;

const TIMES: AppointmentTimeModal[] = [
  { time: '09:00', available: false },
  { time: '09:30', available: false },
  { time: '10:00', available: true },
  { time: '10:30', available: true },
  { time: '11:00', available: true },
  { time: '11:30', available: true },
  { time: '12:00', available: false },
  { time: '13:00', available: true },
  { time: '13:30', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: false },
  { time: '15:00', available: false },
  { time: '15:30', available: false },
  { time: '16:00', available: true },
  { time: '16:30', available: true },
  { time: '17:00', available: false },
];

const AppoinmentTime: React.FC<{
  doctor: CM_EMPLOYEE_ENTITY;
  times: AppointmentTimeModal[];
  onTimeSelected: (model: AppointmentTimeModal) => void;
}> = (props) => {
  return (
    <View style={styles.itemContainer}>
      <DoctorItemRow item={props.doctor} style={styles.doctorItemRow} hideButton />
      <View style={styles.timeListWrapper}>
        {TIMES.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeContainer,
              {
                opacity: item.available ? 1 : 0.4,
              },
            ]}
            disabled={!item.available}
            onPress={() => props.onTimeSelected({ ...item, doctor: props.doctor })}
          >
            <Text style={styles.timeText}>{item.time}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export const NewAppointmentScreen: React.FC<TProps> = (props) => {
  const navigation = useNavigation();
  const { getString } = useLocalization();
  const route = useRoute();

  const model = JSON.parse(route.params['param']) as CM_EMPLOYEE_ENTITY;

  const [appointmentModal, setAppointmentModal] = useState({
    isVisible: false,
    item: null,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDate, setMarkedDate] = useState({});

  const currenDate = new Date();

  const maxDay = new Date(currenDate);
  maxDay.setDate(currenDate.getDate() + 15);

  const onDayPress = (day: any) => {
    setSelectedDate(new Date(day.dateString));
    let markedDate = {};
    markedDate[`${day.dateString}`] = { selected: true, selectedColor: Theme.colors.tintColor };
    setMarkedDate(markedDate);
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'New appointment',
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Calendar
        theme={{
          arrowColor: Theme.colors.tintColor,
          todayTextColor: Theme.colors.primaryColorDark,
        }}
        minDate={currenDate}
        maxDate={maxDay}
        onDayPress={onDayPress}
        markedDates={markedDate}
        monthFormat={'MM yyyy'}
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
      />
      <Divider style={{ marginTop: 12 }} />
      <AppoinmentTime
        doctor={model}
        times={TIMES}
        onTimeSelected={(model: AppointmentTimeModal) => {
          setAppointmentModal({
            isVisible: true,
            item: model,
          });
        }}
      />
      <ConfirmAppointmentModal
        isVisible={appointmentModal.isVisible}
        item={appointmentModal.item}
        selectedDate={selectedDate}
        onDismissModal={() =>
          setAppointmentModal({
            isVisible: false,
            item: appointmentModal.item,
          })
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  calendar: {
    height: 60,
    marginHorizontal: 4,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 16,
    fontSize: 15,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  doctorItemRow: { marginStart: 16, marginEnd: 8, paddingVertical: 0 },
  itemContainer: { paddingVertical: 12 },
  flatListStyle: { marginTop: 16, marginBottom: 4 },
  timeListWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  columnWrapperStyle: { marginHorizontal: 12 },
  timeContainer: {
    backgroundColor: Theme.colors.grayForBoxBackground,
    height: 30,
    width: SCREEN_WIDTH / 4 - 8 - 6,
    margin: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 0.3,
    borderColor: '#c2c2c2',
  },
  timeText: {
    color: Theme.colors.gray,
    fontWeight: '600',
  },
});

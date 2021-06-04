import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Divider, DoctorItemRow, Loading } from '../../components';
import { ConfirmAppointmentModal } from '../../modals';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { AppointmentTimeModal } from '../../models-demo';
import { useLocalization } from '../../localization';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import { ScrollView } from 'react-native-gesture-handler';
import { splitTimeByInterval } from '../../utils/common';
import agent from 'service/api/agent';

type TProps = {};

const SCREEN_WIDTH = Dimensions.get('screen').width;

const AppoinmentTime: React.FC<{
  isFetching: boolean;
  doctor: CM_EMPLOYEE_ENTITY;
  times: AppointmentTimeModal[];
  onTimeSelected: (model: AppointmentTimeModal) => void;
}> = (props) => {
  return (
    <View style={styles.itemContainer}>
      <DoctorItemRow item={props.doctor} style={styles.doctorItemRow} hideButton />
      <View style={styles.timeListWrapper}>
        {props.isFetching ? (
          <Loading />
        ) : (
          props.times.map((item, index) => (
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
          ))
        )}
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
  const [originalAvailableTime, setOriginalAvailableTime] = useState<AppointmentTimeModal[]>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [markedDate, setMarkedDate] = useState({});
  const [availableTime, setAvailableTime] = useState<AppointmentTimeModal[]>([]);
  const [isFetchingAvailability, setIsFetchingAvailability] = useState(false);

  const currenDate = new Date();

  const maxDay = new Date(currenDate);
  maxDay.setDate(currenDate.getDate() + 15);

  const onDayPress = async (day: any) => {
    const selectedDate = new Date(day.dateString);
    setSelectedDate(selectedDate);
    let markedDate = {};
    markedDate[`${day.dateString}`] = { selected: true, selectedColor: Theme.colors.tintColor };
    setMarkedDate(markedDate);
    await checkAvailability(selectedDate);
  };

  const setUpAppointmentModal = () => {
    const tempArr: AppointmentTimeModal[] = [];
    const result = splitTimeByInterval(moment(model.starT_TIME), moment(model.enD_TIME), 0.5);
    result.map((item) => {
      tempArr.push({ time: item, available: true });
    });
    setAvailableTime(tempArr.reverse());
    setOriginalAvailableTime(tempArr);
  };

  const checkAvailability = async (dateCheck: Date) => {
    setIsFetchingAvailability(true);
    const resp = await agent.EC_BOOKING_API.checkAvailable(model.emP_ID, dateCheck.toISOString());
    let tempArrTime = [...originalAvailableTime];
    resp.forEach((booked) => {
      const beginTime = moment(booked.ngaybookfrom);
      const endTime = moment(booked.ngaybookto);
      tempArrTime.forEach((available, index) => {
        const availableTime = moment(beginTime.format('YYYY-MM-DD') + ' ' + available.time);
        if (
          availableTime.isBetween(beginTime, endTime, 'minutes', '[)') ||
          availableTime.isBefore(currenDate, 'minutes')
        ) {
          tempArrTime[index] = {
            ...available,
            available: false,
          };
          //do not fucking do this
          //available = false;
          //or this
          //tempArrTime[index].available = false;
        } else {
          tempArrTime[index] = {
            ...available,
            fromDate: availableTime.format(),
            toDate: availableTime.add(0.5, 'hour').format(),
          };
        }
      });
    });
    setAvailableTime(tempArrTime);
    setIsFetchingAvailability(false);
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'New appointment',
    });
    setUpAppointmentModal();
  }, []);

  useEffect(() => {
    if (originalAvailableTime) onDayPress({ dateString: moment().format('YYYY-MM-DD') });
  }, [originalAvailableTime]);

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
        isFetching={isFetchingAvailability}
        doctor={model}
        times={availableTime}
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
        onSubmitBooking={() => {
          checkAvailability(selectedDate);
        }}
        onDismissModal={() => {
          setAppointmentModal({
            isVisible: false,
            item: appointmentModal.item,
          });
        }}
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
  doctorItemRow: { margin: 10, paddingVertical: 0 },
  itemContainer: { paddingVertical: 12 },
  flatListStyle: { marginTop: 16, marginBottom: 4 },
  timeListWrapper: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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

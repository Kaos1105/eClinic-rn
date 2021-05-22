import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { Theme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { Divider, DoctorItemRow, Button } from '../../components';
import { ConfirmAppointmentModal } from '../../modals';
import moment from 'moment';
import { doctorsList } from '../../datas';
import ReactNativeModal from 'react-native-modal';
import { DoctorModel, AppointmentTimeModal } from '../../models-demo';
import { useLocalization } from '../../localization';

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
  doctor: DoctorModel;
  times: AppointmentTimeModal[];
  onTimeSelected: (model: AppointmentTimeModal) => void;
}> = (props) => {
  return (
    <View style={styles.itemContainer}>
      <DoctorItemRow item={props.doctor} style={styles.doctorItemRow} />
      <FlatList
        data={TIMES}
        numColumns={4}
        style={styles.flatListStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
        keyExtractor={(item, index) => `key${index}ForTime`}
        renderItem={({ item }) => (
          <TouchableOpacity
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
        )}
      />
    </View>
  );
};

export const NewAppointmentScreen: React.FC<TProps> = (props) => {
  const navigation = useNavigation();
  const { getString } = useLocalization();

  const [appointmentModal, setAppointmentModal] = useState({
    isVisible: false,
    item: null,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    navigation.setOptions({
      title: moment().format('MMMM YYYY'),
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        style={styles.calendar}
        calendarHeaderStyle={{
          display: 'none',
        }}
        onWeekChanged={(date: Date) => {
          navigation.setOptions({
            title: moment(date).format('MMMM YYYY'),
          });
        }}
        onDateSelected={(date: Date) => setSelectedDate(date)}
        dateNumberStyle={{ color: Theme.colors.gray }}
        dateNameStyle={{ color: Theme.colors.gray }}
        highlightDateNumberStyle={{
          color: Theme.colors.primaryColor,
        }}
        highlightDateNameStyle={{
          color: Theme.colors.primaryColor,
        }}
        disabledDateNameStyle={{ color: 'grey' }}
        disabledDateNumberStyle={{ color: 'grey' }}
      />
      <Divider style={{ marginTop: 12 }} />
      <Text style={styles.sectionTitle}>{getString('Available Doctors')}</Text>
      <FlatList
        data={doctorsList}
        style={{ marginTop: 8 }}
        keyExtractor={(item, index) => `key${index}ForDoctors`}
        renderItem={({ item }) => (
          <AppoinmentTime
            doctor={item}
            times={TIMES}
            onTimeSelected={(model: AppointmentTimeModal) => {
              setAppointmentModal({
                isVisible: true,
                item: model,
              });
            }}
          />
        )}
        ItemSeparatorComponent={() => <Divider />}
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
    </View>
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

import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { CalendarItemRow } from '../../components';
import NavigationNames from '../../navigations/NavigationNames';
import { FabButton, Button } from '../../components/buttons';
import { useLocalization } from '../../localization';
import { Theme } from '../../theme';
import { DetailAppointmentModal } from '../../modals';
import reactotron from 'reactotron-react-native';
import agent from 'service/api/agent';
import { RootStoreContext } from 'stores/rootStore';
import { observer } from 'mobx-react-lite';
import { EC_BOOKING_ENTITY } from 'models/EC_BOOKING_ENTITY';

export const CalendarScreen: React.FC<{}> = observer((props) => {
  //Hook
  const refAgenda = useRef<Agenda>();
  const navigation = useNavigation();
  const route = useRoute();
  const { getString } = useLocalization();

  //Store
  const rootStore = useContext(RootStoreContext);
  const { currentUser } = rootStore.usersStore;
  const { isLoaded, setIsLoaded } = rootStore.commonStore;
  //State
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [items, setItems] = useState({});
  const [appointmentModal, setAppointmentModal] = useState({
    isVisible: false,
    item: null,
  });

  const onPressNewAppointment = () => {
    navigation.navigate(NavigationNames.DoctorListScreen);
  };
  const onPressToday = () => {
    const today = new Date();
    refAgenda.current.chooseDay(today);
  };

  const onDayPress = async (day: any) => {
    const selectedDate = new Date(day.dateString);
    setSelectedDate(day.dateString);
    await fetchListBooking(selectedDate);
  };

  const fetchListBooking = async (dateCheck: Date) => {
    setIsLoaded(false);
    const resp = await agent.EC_BOOKING_API.getBookingByDate(
      currentUser ? currentUser.BENHNHAN_ID : '',
      dateCheck.toISOString()
    );
    if (resp.length > 0) setItems({ [moment(dateCheck).format('YYYY-MM-DD')]: [...resp] });
    else setItems(null);
    setIsLoaded(true);
  };

  //Initial Load
  useEffect(() => {
    if (route.params && route.params['model']) {
      const model = JSON.parse(route.params['model']) as EC_BOOKING_ENTITY;
      const dateString = model.ngaybookfrom.toString().split('T')[0];
      setSelectedDate(dateString);
      fetchListBooking(new Date(dateString));
    } else {
      fetchListBooking(new Date(selectedDate));
    }
  }, [route.params]);

  //set Header option
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item title={getString('Today')} onPress={onPressToday} />
        </HeaderButtons>
      ),
    });
  }, []);

  if (!isLoaded) return null;

  return (
    <View style={styles.container}>
      <Agenda
        ref={refAgenda}
        items={items}
        loadItemsForMonth={(month) => {}}
        onCalendarToggled={(calendarOpened) => {}}
        onDayPress={onDayPress}
        onDayChange={(day) => {}}
        selected={selectedDate}
        pastScrollRange={3}
        futureScrollRange={3}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
        hideKnob={false}
        onRefresh={() => {}}
        refreshing={false}
        refreshControl={null}
        theme={{
          agendaKnobColor: '#dcdcdc',
          selectedDayBackgroundColor: Theme.colors.primaryColor,
        }}
        renderEmptyDate={() => <View />}
        renderDay={(day, item) => <View />}
        renderItem={(item: EC_BOOKING_ENTITY, firstItemInDay) => {
          return (
            <View
              style={{
                marginVertical: 8,
              }}
            >
              <CalendarItemRow
                style={styles.calendarItem}
                item={item}
                onPressBooking={() => {
                  setAppointmentModal({
                    isVisible: true,
                    item: item,
                  });
                }}
              />
              {/* <Text>{item.bookinG_ID}</Text> */}
            </View>
            // <View style={{ marginVertical: 8 }}>
            //   <Text>{item.bacsykhaM_ID}</Text>
            // </View>
          );
        }}
        renderEmptyData={() => {
          return (
            <View style={styles.emptyDataContainer}>
              <Ionicons name='ios-cafe' size={32} color={Theme.colors.black} />
              <Text style={styles.emptyDataTitle}>{getString('No Appointment')}</Text>
              <View style={styles.emptyDataButtonContainer}>
                <Button title={getString('New Appointment')} onPress={onPressNewAppointment} />
              </View>
            </View>
          );
        }}
      />
      {items && <FabButton onPress={onPressNewAppointment} />}
      <DetailAppointmentModal
        isVisible={appointmentModal.isVisible}
        item={appointmentModal.item}
        onSubmitBooking={() => {
          fetchListBooking(new Date(selectedDate));
        }}
        onDismissModal={() => {
          setAppointmentModal({
            isVisible: false,
            item: appointmentModal.item,
          });
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Theme.colors.formBackground,
  },
  infoText: {
    fontSize: 22,
    fontWeight: '600',
    paddingBottom: 12,
    marginTop: 8,
  },
  calendarItem: {
    backgroundColor: 'white',
    marginStart: 8,
    marginEnd: 8,
    shadowRadius: 2,
    shadowColor: 'gray',
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  emptyDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyDataTitle: {
    color: Theme.colors.black,
    marginTop: 8,
    paddingHorizontal: 40,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '100',
  },
  emptyDataButtonContainer: {
    marginTop: 24,
  },
});

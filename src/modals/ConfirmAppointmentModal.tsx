import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';
import { useLocalization } from '../localization';
import { Theme } from '../theme';
import { Button } from '../components/buttons/Button';
import { Divider } from '../components/divider';
import { AppointmentTimeModal } from '../models-demo';
import moment from 'moment';
import { Formik } from 'formik';
import { FormTextInput } from '../components/formInput';
import * as yup from 'yup';
import { RootStoreContext } from 'stores/rootStore';
import { Loading } from '../components/ui';
import { EC_BOOKING_ENTITY } from 'models/EC_BOOKING_ENTITY';
import reactotron from 'reactotron-react-native';
import { useNavigation } from '@react-navigation/native';
import NavigationNames from 'navigations/NavigationNames';
import agent from 'service/api/agent';
import { IUserData } from 'models/userData';
import { observer } from 'mobx-react-lite';

type TProps = {
  item?: AppointmentTimeModal;
  isVisible: boolean;
  selectedDate: Date;
  onDismissModal: () => void;
  onSubmitBooking: () => void;
};

const appointmentValidationScheme = yup.object().shape({
  ghichu: yup.string().required('Note is required'),
  lydodenkham: yup.string().required('Symptom is required'),
});

export const ConfirmAppointmentModal: React.FC<TProps> = observer((props) => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  //Store
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.fireBaseAuthStore;
  const { currentUser, getUser, editUser } = rootStore.usersStore;
  //State
  const [isBooking, setIsBooking] = useState(false);

  const handleSubmit = async (values: EC_BOOKING_ENTITY) => {
    let bookingData: EC_BOOKING_ENTITY = { ...values };
    setIsBooking(true);
    let resp = await agent.EC_BOOKING_API.bookingIns(bookingData);
    const userData: IUserData = { ...currentUser, BENHNHAN_ID: resp.BENHNHAN_ID };
    if (currentUser.BENHNHAN_ID !== userData.BENHNHAN_ID) await editUser(userData);
    setIsBooking(false);
    props.onDismissModal();
    props.onSubmitBooking();
  };

  if (props.item === null) {
    return null;
  }
  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      swipeDirection={'down'}
      style={styles.modalView}
      // onSwipeComplete={props.onDismissModal}
      // onBackdropPress={props.onDismissModal}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <Text style={styles.titleText}>{getString('Appointment Details')}</Text>
          <View style={styles.doctorContainer}>
            <Text style={{ color: Theme.colors.gray }}>{getString('Doctor')}</Text>
            <Text style={styles.doctorName}>{props.item.doctor.emP_NAME}</Text>
            <Text style={styles.doctorTitle}>{props.item.doctor.chuyenkhoA_TEN}</Text>
          </View>
          <Divider />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{props.item.time}</Text>
            <Text style={styles.dateText}>{moment(props.selectedDate).format('LL')}</Text>
          </View>
          <Divider />
          {!currentUser ? (
            <View>
              <Text style={styles.guideText}>Please update your profile first</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginBottom: 20,
                }}
              >
                <Button
                  style={{ marginTop: 8 }}
                  title={getString('User profile')}
                  onPress={() => {
                    props.onDismissModal();
                    navigation.navigate(NavigationNames.ProfileTab, {
                      screen: NavigationNames.UserProfile,
                    });
                  }}
                />
                <Button
                  title={getString('CLOSE')}
                  disabled={isBooking}
                  type='outline'
                  style={{ marginTop: 8 }}
                  onPress={props.onDismissModal}
                />
              </View>
            </View>
          ) : (
            <Formik
              initialValues={{
                ngaybookto: props.item.toDate,
                ngaybookfrom: props.item.fromDate,
                lydodenkham: '',
                bacsykhaM_ID: props.item.doctor.emP_ID,
                ghichu: '',
                benhnhaN_ID: currentUser.BENHNHAN_ID,
                hovaten: currentUser.fullName,
                gioitinh: currentUser.gender,
                diachi: currentUser.address,
                ngaysinh: moment(currentUser.dateOfBirth),
                dienthoai: currentUser.phoneNumber,
                recorD_STATUS: '1',
                trangthai: 'CKB',
                color: Theme.colors.tintColor,
              }}
              validationSchema={appointmentValidationScheme}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                dirty,
              }) => (
                <View>
                  <View style={{ marginBottom: 25 }}>
                    <FormTextInput
                      onInputChange={handleChange('lydodenkham')}
                      onInputBlur={handleBlur('lydodenkham')}
                      value={values.lydodenkham}
                      label='Triệu chứng'
                      error={errors.lydodenkham}
                      touched={touched.lydodenkham}
                      placeholder='Triệu chứng'
                      keyboardType='default'
                    />
                    <FormTextInput
                      onInputChange={handleChange('ghichu')}
                      onInputBlur={handleBlur('ghichu')}
                      value={values.ghichu}
                      label='Ghi chú'
                      error={errors.ghichu}
                      touched={touched.ghichu}
                      placeholder='Ghi chú cho bác sĩ'
                      keyboardType='default'
                    />
                    <Divider />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginBottom: 20,
                    }}
                  >
                    <Button
                      style={{ marginTop: 8 }}
                      disabled={!isValid || !dirty || isBooking}
                      title={getString('CONFIRM')}
                      onPress={() => {
                        handleSubmit();
                      }}
                    />
                    <Button
                      title={getString('CLOSE')}
                      disabled={isBooking}
                      type='outline'
                      style={{ marginTop: 8 }}
                      onPress={props.onDismissModal}
                    />
                  </View>
                </View>
              )}
            </Formik>
          )}
        </View>
      </SafeAreaView>
    </ReactNativeModal>
  );
});

const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: 'white',
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  flex1: { flex: 1 },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    padding: 24,
    paddingBottom: 4,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  doctorContainer: { paddingVertical: 16 },
  doctorName: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.colors.black,
    marginTop: 4,
  },
  doctorTitle: {
    fontSize: 13,
    color: Theme.colors.gray,
    fontWeight: '600',
    marginTop: 2,
  },
  timeContainer: {
    paddingVertical: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 62,
    fontWeight: '200',
    color: Theme.colors.black,
    marginTop: 4,
  },
  dateText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 12,
    color: Theme.colors.black,
  },
  guideText: { marginTop: 20, fontSize: 20, fontWeight: 'bold', alignSelf: 'center' },
});

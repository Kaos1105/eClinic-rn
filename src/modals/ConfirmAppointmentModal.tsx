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

type TProps = {
  item?: AppointmentTimeModal;
  isVisible: boolean;
  selectedDate: Date;
  onDismissModal: () => void;
};

const appointmentValidationScheme = yup.object().shape({
  ghichu: yup.string().required('Note is required'),
  lydodenkham: yup.string().required('Symptom is required'),
});

export const ConfirmAppointmentModal: React.FC<TProps> = (props) => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  //Store
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.fireBaseAuthStore;
  const { currentUser, getUser } = rootStore.usersStore;
  //State
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      getUser(user.phoneNumber).then(() => {
        setAppLoaded(true);
      });
    }
    setAppLoaded(true);
  }, [currentUser]);

  const handleSubmit = (values: EC_BOOKING_ENTITY) => {
    let bookingData: EC_BOOKING_ENTITY = { ...values };
    agent.EC_BOOKING_API.bookingIns(bookingData).then((value) => {
      reactotron.log(value);
    });
  };

  if (props.item === null) {
    return null;
  }
  if (!appLoaded) return <Loading />;
  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      swipeDirection={'down'}
      style={styles.modalView}
      onSwipeComplete={props.onDismissModal}
      onBackdropPress={props.onDismissModal}
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
              <Button
                style={{ marginTop: 8 }}
                title={getString('Update user profile')}
                onPress={() => {
                  props.onDismissModal();
                  navigation.navigate(NavigationNames.ProfileTab, {
                    screen: NavigationNames.UserProfile,
                  });
                }}
              />
            </View>
          ) : (
            <Formik
              initialValues={{
                ngaybookto: props.item.toDate,
                ngaybookfrom: props.item.fromDate,
                lydodenkham: '',
                bacsykhaM_ID: props.item.doctor.emP_ID,
                ghichu: '',
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
                      disabled={!isValid || !dirty}
                      title={getString('CONFIRM')}
                      onPress={() => {
                        handleSubmit();
                        props.onDismissModal();
                      }}
                    />
                    <Button
                      title={getString('CANCEL')}
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
};

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

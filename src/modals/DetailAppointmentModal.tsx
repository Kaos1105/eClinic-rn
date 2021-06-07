import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';
import { useLocalization } from '../localization';
import { Theme } from '../theme';
import { Button } from '../components/buttons/Button';
import { Divider } from '../components/divider';
import moment from 'moment';
import { Formik } from 'formik';
import { FormTextInput } from '../components/formInput';
import * as yup from 'yup';
import { RootStoreContext } from 'stores/rootStore';
import { EC_BOOKING_ENTITY } from 'models/EC_BOOKING_ENTITY';
import { useNavigation } from '@react-navigation/native';
import agent from 'service/api/agent';
import { Loading } from '../components/ui';
import { observer } from 'mobx-react-lite';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import reactotron from 'reactotron-react-native';
import { appointmentStatusConst } from '../components/calendar';

type TProps = {
  item?: EC_BOOKING_ENTITY;
  isVisible: boolean;
  onDismissModal: () => void;
  onSubmitBooking: () => void;
};

const appointmentValidationScheme = yup.object().shape({
  ghichu: yup.string().required('Note is required'),
  lydodenkham: yup.string().required('Symptom is required'),
});

export const DetailAppointmentModal: React.FC<TProps> = observer((props) => {
  const { getString } = useLocalization();
  const navigation = useNavigation();
  //Store
  const rootStore = useContext(RootStoreContext);
  const [isLoaded, setIsLoaded] = useState(false);
  //State
  const [isBooking, setIsBooking] = useState(false);
  const [clinic, setClinic] = useState<EC_PHONGKHAM_ENTITY>(null);

  const handleSubmit = async (values: EC_BOOKING_ENTITY) => {
    let bookingData: EC_BOOKING_ENTITY = {
      ...props.item,
      lydodenkham: values.lydodenkham,
      ghichu: values.ghichu,
    };
    setIsBooking(true);
    let resp = await agent.EC_BOOKING_API.bookingUpd(bookingData);
    reactotron.log(resp);
    setIsBooking(false);
    props.onDismissModal();
    props.onSubmitBooking();
  };

  const handleCancel = async () => {
    let bookingData: EC_BOOKING_ENTITY = { ...props.item, trangthai: 'HL', bacsykhaM_ID: null };
    setIsBooking(true);
    let resp = await agent.EC_BOOKING_API.bookingUpd(bookingData);
    reactotron.log(resp);
    setIsBooking(false);
    props.onDismissModal();
    props.onSubmitBooking();
  };

  const getButtonStatus = (status: string) => {
    return appointmentStatusConst.unfinished === status;
  };

  useEffect(() => {
    console.log(props.item?.tenanT_ID);
    if (props.item?.tenanT_ID) {
      agent.EC_PHONGKHAM_API.details(props.item.tenanT_ID).then((result) => {
        setClinic(result);
        setIsLoaded(true);
      });
    }
  }, [props.item?.tenanT_ID]);
  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      swipeDirection={'down'}
      style={styles.modalView}
      // onSwipeComplete={props.onDismissModal}
      // onBackdropPress={props.onDismissModal}
    >
      {!isLoaded || !props.item ? (
        <Loading color='gray' />
      ) : (
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.container}>
            <Text style={styles.titleText}>{getString('Appointment Details')}</Text>
            <View style={styles.doctorContainer}>
              <Text style={{ color: Theme.colors.gray }}>{getString('Doctor')}</Text>
              <Text style={styles.doctorName}>{props.item.tenBacSi}</Text>
              <Text style={styles.clinicTitle}>{clinic?.phongkhaM_TENDAYDU}</Text>
              <Text style={styles.doctorTitle}>{clinic?.chuyenkhoA_TEN}</Text>
            </View>
            <Divider />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{moment(props.item.ngaybookfrom).format('HH:mm')}</Text>
              <Text style={styles.dateText}>{moment(props.item.ngaybookfrom).format('LL')}</Text>
            </View>
            <Divider />

            <Formik
              initialValues={{
                lydodenkham: props.item.lydodenkham,
                ghichu: props.item.ghichu,
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
                      editable={getButtonStatus(props.item.trangthai)}
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
                      editable={getButtonStatus(props.item.trangthai)}
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
                      disabled={
                        !isValid || !dirty || isBooking || !getButtonStatus(props.item.trangthai)
                      }
                      title={getString('UPDATE')}
                      onPress={() => {
                        handleSubmit();
                      }}
                    />
                    <Button
                      style={{ marginTop: 8, backgroundColor: Theme.colors.status.bussy }}
                      disabled={isBooking || !getButtonStatus(props.item.trangthai)}
                      title={getString('CANCEl')}
                      onPress={() => {
                        handleCancel();
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
          </View>
        </SafeAreaView>
      )}
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
  clinicTitle: {
    fontSize: 13,
    color: Theme.colors.primaryColorDark,
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

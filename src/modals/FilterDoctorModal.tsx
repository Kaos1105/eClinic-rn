import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';
import { useLocalization } from '../localization';
import { Theme } from '../theme';
import { Button } from '../components/buttons/Button';
import { Divider } from '../components/divider';
import { AppointmentTimeModal } from '../models-demo';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

type TProps = {
  onSubmitFilter: () => void;
};

export const FilterDoctorModal: React.FC<TProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { getString } = useLocalization();

  return (
    <View>
      <Button style={styles.searchButton} title={'Search'} onPress={() => setIsVisible(true)}>
        <Ionicons name='search' size={18} color='white' style={{ marginRight: 10 }} />
      </Button>
      <ReactNativeModal
        isVisible={isVisible}
        swipeDirection={'down'}
        style={styles.modalView}
        onSwipeComplete={props.onSubmitFilter}
        onBackdropPress={props.onSubmitFilter}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.container}>
            <Text style={styles.titleText}>{getString('Appoinment Details')}</Text>
            <View style={styles.doctorContainer}>
              <Text style={{ color: Theme.colors.gray }}>{getString('Doctor')}</Text>
              <Text style={styles.doctorName}>Tên</Text>
              <Text style={styles.doctorTitle}>Tên nhỏ</Text>
            </View>
            <Divider />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>Thời gian</Text>
              <Text style={styles.dateText}>Ngày</Text>
            </View>
            <Button title={getString('CONFIRM')} onPress={() => setIsVisible(false)} />
            <Button title={getString('CANCEL')} type='outline' style={{ marginTop: 8 }} />
          </View>
        </SafeAreaView>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchButton: {
    width: '50%',
    height: 30,
    borderRadius: 10,
    alignSelf: 'center',
  },
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
    paddingVertical: 36,
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
});

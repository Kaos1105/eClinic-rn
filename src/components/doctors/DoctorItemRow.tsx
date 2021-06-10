import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { Avatar } from '../avatar';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import AppConsts from '../../lib/appconst';
import NavigationNames from 'navigations/NavigationNames';
import { useNavigation } from '@react-navigation/native';
import { useLocalization } from '../../localization';

type TProps = {
  item: CM_EMPLOYEE_ENTITY;
  style?: ViewStyle;
  hideButton?: boolean;
};

export const DoctorItemRow: React.FC<TProps> = (props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const navigation = useNavigation();

  const { getString } = useLocalization();
  return (
    <>
      <TouchableOpacity
        style={[styles.container, props.style]}
        onPress={() =>
          navigation.navigate(NavigationNames.DoctorDetailScreen, {
            model: JSON.stringify(props.item),
          })
        }
      >
        <Avatar
          // status={props.item.isOnline ? 'online' : null}
          source={{
            uri: `${AppConsts.remoteServiceBaseUrl}/${props.item.hinhdaidien}`,
          }}
          style={styles.avatar}
        />
        <View style={styles.textContent}>
          <Text style={styles.doctorNameText}>{props.item.emP_NAME}</Text>
          <Text style={styles.doctorTitleText}>{props.item.phongkhaM_TEN}</Text>
          <Text style={styles.specialtyText}>{props.item.chuyenkhoA_TEN}</Text>
        </View>
      </TouchableOpacity>
      {!props.hideButton && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => {
            navigation.navigate(NavigationNames.NewAppointmentScreen, {
              param: JSON.stringify(props.item),
            });
          }}
        >
          {/* <AirbnbRating
              showRating={false}
              count={5}
              size={17}
              isDisabled
              selectedColor={'orange'}
              defaultRating={props.item.rating}
            /> */}
          {/* <TouchableOpacity onPress={() => setVisibleModal(true)}> */}
          <Text style={{ fontSize: 12, position: 'relative' }}>{getString('Booking')}</Text>
          <Ionicons size={24} name='md-add' color={Theme.colors.primaryColorDark} />
        </TouchableOpacity>
      )}
      {/* <DoctorDetailsBottomSheet
        doctor={props.item}
        isVisible={visibleModal}
        onDismissModal={() => setVisibleModal(false)}
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.dividerColor,
    shadowColor: Theme.colors.grayForBoxBackground,
    shadowRadius: 2,
    padding: 5,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // position: 'relative',
    marginBottom: 10,
  },
  avatar: { alignSelf: 'center' },
  textContent: { flex: 1, paddingHorizontal: 5 },
  doctorNameText: {
    fontSize: 15,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  doctorTitleText: {
    marginTop: 4,
    color: Theme.colors.gray,
    fontSize: 12,
  },
  specialtyText: {
    color: Theme.colors.primaryColorDark,
    fontSize: 13,
  },
  iconContainer: {
    backgroundColor: Theme.colors.tintColor,
    borderRadius: 10,
    width: 100,
    height: 30,
    position: 'absolute',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    top: 65,
    right: 15,
  },
});

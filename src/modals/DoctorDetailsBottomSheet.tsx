import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ReactNativeModal } from 'react-native-modal';
import { AirbnbRating } from 'react-native-ratings';
import numeral from 'numeral';
import { Avatar } from '../components/avatar';
import { Divider } from '../components/divider';
import { Theme } from '../theme';
import { DoctorModel, ReviewModel } from '../models-demo';
import { useLocalization } from '../localization';
import { DoctorReviewItemRow } from '../components/reviews';
import { useNavigation } from '@react-navigation/native';
import NavigationNames from '../navigations/NavigationNames';

type TProps = {
  doctor: DoctorModel;
  isVisible: boolean;
  onDismissModal: () => void;
};

export const DoctorDetailsBottomSheet: React.FC<TProps> = (props) => {
  const { getString } = useLocalization();
  const navigation = useNavigation();

  return (
    <ReactNativeModal
      isVisible={props.isVisible}
      swipeDirection={'down'}
      style={styles.modalView}
      onSwipeComplete={props.onDismissModal}
      onBackdropPress={props.onDismissModal}
    >
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.modalContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              source={{
                uri: props.doctor.imageUrl,
              }}
              imageStyle={styles.doctorPreviewImage}
            />
            <View style={styles.textContent}>
              <Text style={styles.doctorFullName}>{props.doctor.fullName}</Text>
              <Text style={styles.doctorTitle}>{props.doctor.title}</Text>
              <TouchableOpacity
                style={styles.buttonContent}
                onPress={() => {
                  navigation.navigate(NavigationNames.DoctorDetailScreen, {
                    model: JSON.stringify(props.doctor),
                  });
                  props.onDismissModal();
                }}
              >
                <Text style={styles.buttonText}>{getString('View Full Profile')}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={props.onDismissModal}>
              <Ionicons size={38} name='ios-close' color={Theme.colors.grayForItemsMore} />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContent}>
            <Text style={styles.ratingText}>{numeral(props.doctor.rating).format('0.0')}</Text>
            <AirbnbRating
              showRating={false}
              count={5}
              size={17}
              isDisabled
              selectedColor={'orange'}
              defaultRating={props.doctor.rating}
            />
            <Text style={styles.ratingReviewsText}>
              {`(${props.doctor.reviews.length} ${getString('reviews')})`}
            </Text>
          </View>

          <Text style={{ fontWeight: '600' }}>{getString('Latest reviews')}</Text>
          <FlatList<ReviewModel>
            data={props.doctor.reviews.slice(0, 2)}
            keyExtractor={(item, index) => `key${index}ForReview`}
            ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            renderItem={(row) => <DoctorReviewItemRow item={row.item} />}
            style={{ marginTop: 16 }}
          />
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
  modalContainer: {
    padding: 16,
  },
  flex1: { flex: 1 },
  modalView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  doctorPreviewImage: {
    width: 95,
    height: 95,
    borderRadius: 24,
  },
  textContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  doctorFullName: {
    fontSize: 17,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  doctorTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: Theme.colors.gray,
    marginTop: 6,
  },
  buttonContent: {
    backgroundColor: Theme.colors.primaryColor,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  buttonText: { color: 'white', fontWeight: '600', fontSize: 12 },
  closeButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    marginTop: -4,
    marginEnd: -4,
  },
  ratingContent: {
    flexDirection: 'row',
    marginVertical: 12,
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: 'bold',
    fontSize: 26,
    marginEnd: 8,
    color: Theme.colors.black,
  },
  ratingReviewsText: {
    fontSize: 13,
    color: Theme.colors.gray,
    marginStart: 8,
    fontWeight: '600',
    opacity: 0.8,
  },
  divider: { marginHorizontal: 0, marginVertical: 12 },
});

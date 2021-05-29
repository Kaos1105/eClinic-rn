import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { Theme } from '../../theme';
import { DepartmentModel } from '../../models-demo';
import { DM_CHUYENKHOA_ENTITY } from 'models/DM_CHUYENKHOA_ENTITY';
import AppConsts from '../../lib/appconst';

type TProps = {
  item: DM_CHUYENKHOA_ENTITY;
  style?: ViewStyle;
  showShortDesc?: boolean;
};

export const DepartmentItem: React.FC<TProps> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={{
          uri: `${props.item.logo}`,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {props.item.chuyenkhoA_TEN}
        </Text>
        {props.showShortDesc && (
          <Text style={styles.shortDesc} numberOfLines={2}>
            {props.item.notes}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.grayForBoxBackground,
    shadowColor: Theme.colors.grayForBoxBackground,
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  image: {
    tintColor: Theme.colors.tintColor,
    height: 80,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'contain',
  },
  textContainer: {
    padding: 4,
    minHeight: 60,
    marginBottom: 2,
  },
  title: {
    color: Theme.colors.black,
    fontWeight: '600',
    fontSize: 14,
  },
  shortDesc: {
    color: Theme.colors.gray,
    fontSize: 13,
  },
});

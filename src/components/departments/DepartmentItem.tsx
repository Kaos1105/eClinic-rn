import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { Theme } from '../../theme';
import { DepartmentModel } from '../../models-demo';

type TProps = {
  item: DepartmentModel;
  style?: ViewStyle;
  showShortDesc?: boolean;
};

export const DepartmentItem: React.FC<TProps> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      <Image
        source={{
          uri: props.item.imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {props.item.title}
        </Text>
        {props.showShortDesc && (
          <Text style={styles.shortDesc} numberOfLines={2}>
            {props.item.shortDescription}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    minWidth: 110,
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
    height: 84,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textContainer: {
    padding: 12,
    marginBottom: 2,
  },
  title: {
    color: Theme.colors.black,
    fontWeight: '600',
    fontSize: 14,
  },
  shortDesc: {
    color: Theme.colors.gray,
    marginTop: 2,
    fontSize: 13,
  },
});

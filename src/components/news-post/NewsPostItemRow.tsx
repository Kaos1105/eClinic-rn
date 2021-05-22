import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import { NewsPostModel } from '../../models-demo';
import { Theme } from '../../theme';

type TProps = {
  item: NewsPostModel;
};

export const NewsPostItemRow: React.FC<TProps> = (props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: props.item.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText} numberOfLines={2}>
          {props.item.title}
        </Text>
        <Text style={styles.dateText}>{moment(props.item.createdDate).format('LL LT')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  image: { width: 60, height: 60, borderRadius: 12, marginTop: 1 },
  textContainer: {
    flex: 1,
    marginStart: 12,
    alignContent: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: Theme.colors.black,
    fontSize: 15,
  },
  dateText: {
    fontSize: 12,
    color: Theme.colors.gray,
    marginTop: 4,
    fontWeight: '600',
  },
});

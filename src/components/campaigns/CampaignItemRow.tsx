import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '../../theme';
import { CampaignModel } from '../../models-demo';
import moment from 'moment';
import { useLocalization } from '../../localization';

type TProps = {
  item: CampaignModel;
};

export const CampaignItemRow: React.FC<TProps> = (props) => {
  const { getString } = useLocalization();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: props.item.imageUrl }} style={styles.image} />
        <View style={styles.lastDateWrapper}>
          <Text style={styles.lastDateText}>
            {`${getString('Last')} ${moment(props.item.endDate).fromNow(true)}`}
          </Text>
        </View>
      </View>
      <Text style={styles.titleText}>{props.item.title}</Text>
      <Text style={styles.shortDescText}>{props.item.shortDescription}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageWrapper: {
    height: 150,
    backgroundColor: Theme.colors.grayForBoxBackground,
    borderRadius: 12,
  },
  image: { flex: 1, borderRadius: 12 },
  lastDateWrapper: {
    backgroundColor: Theme.colors.primaryColor,
    position: 'absolute',
    top: 12,
    borderTopEndRadius: 6,
    borderBottomEndRadius: 6,
    paddingStart: 6,
    paddingEnd: 8,
    paddingVertical: 2,
  },
  lastDateText: { fontSize: 12, fontWeight: '600', color: 'white' },
  titleText: {
    fontWeight: '600',
    marginTop: 12,
    marginHorizontal: 4,
    color: Theme.colors.black,
    fontSize: 16,
  },
  shortDescText: {
    marginHorizontal: 4,
    fontSize: 14,
    marginTop: 4,
    color: Theme.colors.gray,
  },
});

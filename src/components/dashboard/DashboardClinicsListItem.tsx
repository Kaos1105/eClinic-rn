import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '../../theme';
import moment from 'moment';
import { useLocalization } from '../../localization';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import AppConsts from '../../lib/appconst';

type TProps = {
  item: EC_PHONGKHAM_ENTITY;
};

export const DashboardClinicsListItem: React.FC<TProps> = (props) => {
  const { getString } = useLocalization();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: `${AppConsts.remoteServiceBaseUrl}/${props.item.hinhdaidien}` }}
          style={styles.image}
        />
      </View>
      <Text style={styles.titleText}>{props.item.phongkhaM_TENDAYDU}</Text>
      <Text style={styles.shortDescText}>{props.item.chuyenkhoA_TEN}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
  },
  imageWrapper: {
    height: 120,
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
  lastDateText: { fontSize: 10, fontWeight: '600', color: 'white' },
  titleText: {
    fontWeight: '600',
    marginTop: 8,
    marginHorizontal: 4,
    color: Theme.colors.black,
    fontSize: 15,
  },
  shortDescText: {
    marginHorizontal: 4,
    fontSize: 13,
    marginTop: 2,
    color: Theme.colors.gray,
  },
});

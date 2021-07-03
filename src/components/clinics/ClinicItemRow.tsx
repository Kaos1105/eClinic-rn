import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '../../theme';
import moment from 'moment';
import { useLocalization } from '../../localization';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import AppConsts from '../../lib/appconst';
import { Divider } from '../../components';
import { Ionicons } from '@expo/vector-icons';

type TProps = {
  item: EC_PHONGKHAM_ENTITY;
};

export const ClinicItemRow: React.FC<TProps> = (props) => {
  const { getString } = useLocalization();
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: `${AppConsts.remoteServiceBaseUrl}/${props.item.hinhdaidien.replace(
              'wwwroot/',
              ''
            )}`,
          }}
          style={styles.image}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.titleText}>{props.item.phongkhaM_TENDAYDU}</Text>
        <Text style={styles.shortDescText}>{props.item.chuyenkhoA_TEN}</Text>
        <Divider style={{ margin: 5 }} />
        <View style={styles.infoRow}>
          <Ionicons name='location' color={Theme.colors.tintColor} size={18} />
          <Text style={styles.textInfo}>{props.item.diachI_1}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageWrapper: {
    height: 100,
    width: 100,
    borderRadius: 12,
  },
  image: { flex: 1, borderRadius: 12 },
  titleText: {
    fontWeight: '600',
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
  infoRow: { flex: 1, flexDirection: 'row' },
  textInfo: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
});

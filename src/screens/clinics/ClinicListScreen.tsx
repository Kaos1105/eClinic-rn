import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { campaignList } from '../../datas';
import { CampaignItemRow, Divider } from '../../components';
import NavigationNames from '../../navigations/NavigationNames';
import { useNavigation } from '@react-navigation/native';

type TProps = {};

export const ClinicListScreen: React.FC<TProps> = (props) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={campaignList}
        renderItem={(row) => (
          <TouchableOpacity
            style={styles.rowItem}
            onPress={() =>
              navigation.navigate(NavigationNames.ClinicDetailScreen, {
                model: JSON.stringify(row.item),
                title: row.item.title,
              })
            }
          >
            <CampaignItemRow item={row.item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        keyExtractor={(item, index) => `key${index}ForCampaign`}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainerStyle: {
    paddingVertical: 16,
  },
  rowItem: {
    paddingHorizontal: 16,
  },
  divider: {
    marginVertical: 16,
  },
});

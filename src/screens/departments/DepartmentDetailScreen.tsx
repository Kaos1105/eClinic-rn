import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Theme } from '../../theme';
import { Divider, Button } from '../../components';
import { useLocalization } from '../../localization';
import { DM_CHUYENKHOA_ENTITY } from 'models/DM_CHUYENKHOA_ENTITY';
import NavigationNames from 'navigations/NavigationNames';
import { observer } from 'mobx-react-lite';

type TProps = {};

export const DepartmentDetailScreen: React.FC<TProps> = observer((props) => {
  // States
  const [photoViewerConfig, setPhotoViewerConfig] = useState({
    selectedPhotoIndex: 0,
    isShowed: false,
  });

  // Hooks
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const route = useRoute();

  // Params
  const model = JSON.parse(route.params['model']) as DM_CHUYENKHOA_ENTITY;

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: `${model.logo}` }} style={styles.headerImage} />
        <View style={styles.content}>
          <Text style={styles.titleText}>{model.chuyenkhoA_TEN}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{getString('Details')}</Text>
          <Divider />
          <Text style={styles.aboutText}>{model.mota}</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>{getString('Specialty Clinics')}</Text>
          <Divider />
          <Button
            title={getString('Clinics list screen')}
            onPress={() => {
              navigation.navigate(NavigationNames.ClinicListScreen, {
                param: JSON.stringify(model),
              });
            }}
          />
        </View>
      </ScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerImage: {
    height: 180,
    resizeMode: 'contain',
    tintColor: Theme.colors.primaryColorDark,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleText: {
    fontSize: 19,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  sectionContainer: { paddingHorizontal: 16, marginTop: 12 },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 15,
    paddingVertical: 8,
    color: Theme.colors.primaryColorDark,
  },
  aboutText: {
    paddingVertical: 8,
    color: Theme.colors.black,
    fontSize: 15,
  },
});

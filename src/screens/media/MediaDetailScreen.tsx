import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../theme';
import { MediaModel } from '../../models-demo';
import { useLocalization } from '../../localization';
import { Divider, HtmlView } from '../../components';

type TProps = {};

export const MediaDetailScreen: React.FC<TProps> = (props) => {
  const { getString } = useLocalization();
  const route = useRoute();
  const navigation = useNavigation();

  const model = JSON.parse(route.params['model']) as MediaModel;

  navigation.setOptions({ title: getString('Details') });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerImage}>
        <Image
          source={{
            uri: model.imageUrl,
          }}
          style={styles.image}
        />
        <View style={styles.liveContainer}>
          <Text style={styles.liveText}>{getString('LIVE')}</Text>
        </View>
        <View style={styles.playButtonContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name='ios-play-circle' color='white' size={66} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{model.title}</Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.doctorContainer}>
        <Image source={{ uri: model.doctor.imageUrl }} style={styles.doctorImage} />
        <View style={styles.doctorInfoRows}>
          <Text style={styles.doctorNameText}>{model.doctor.fullName}</Text>
          <Text style={styles.doctorTitleText}>{model.doctor.title}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.detailContainer}>
        <Text style={styles.detailTitleText}>{getString('Details')}</Text>
        <HtmlView htmlContent={model.htmlContent} imagesMaxWidthOffset={40} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    paddingVertical: 16,
  },
  headerImage: {
    marginHorizontal: 16,
  },
  image: {
    height: 210,
    borderRadius: 16,
    borderWidth: 0.4,
    borderColor: Theme.colors.formBackground,
  },
  divider: { marginHorizontal: 16 },
  liveContainer: {
    position: 'absolute',
    start: 16,
    top: 16,
    backgroundColor: '#F93C1A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveText: { color: 'white', fontSize: 13 },
  titleContainer: { paddingHorizontal: 20, paddingVertical: 16 },
  titleText: { fontSize: 17, fontWeight: '600', color: Theme.colors.black },
  doctorContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
  },
  doctorImage: { width: 48, height: 48, borderRadius: 12 },
  doctorInfoRows: { marginHorizontal: 12, justifyContent: 'center' },
  doctorNameText: {
    fontWeight: '600',
    fontSize: 15,
    color: Theme.colors.black,
  },
  doctorTitleText: {
    marginTop: 4,
    fontWeight: '600',
    color: Theme.colors.gray,
    opacity: 0.8,
  },
  detailContainer: { paddingHorizontal: 20, paddingVertical: 16 },
  detailTitleText: {
    fontWeight: '600',
    marginBottom: 4,
    color: Theme.colors.black,
    fontSize: 15,
  },
  playButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000020',
    borderRadius: 16,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

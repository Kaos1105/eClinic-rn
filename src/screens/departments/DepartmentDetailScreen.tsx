import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { DepartmentModel } from '../../models-demo';
import { Theme } from '../../theme';
import { HtmlView, Divider, NewsPostItemRow, TouchableHighlight } from '../../components';
import { useLocalization } from '../../localization';
import moment from 'moment';
import { PhotoViewerModal } from '../../modals';

type TProps = {};

export const DepartmentDetailScreen: React.FC<TProps> = (props) => {
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
  const model = JSON.parse(route.params['model']) as DepartmentModel;

  navigation.setOptions({ title: model.title });

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: model.imageUrl }} style={styles.headerImage} />
        <View style={styles.content}>
          <Text style={styles.titleText}>{model.title}</Text>
          <Text style={styles.shortDescText}>{model.shortDescription}</Text>
          <View style={styles.htmlContent}>
            <HtmlView htmlContent={model.htmlContent} imagesMaxWidthOffset={32} />
          </View>
        </View>
        <Divider />
        <View style={styles.content}>
          <Text style={styles.sectionTitleText}>{getString('Department Services')}</Text>
          <FlatList
            data={model.departmentServices}
            keyExtractor={(item, index) => `key${index}ForDepartmentService`}
            renderItem={({ item }) => (
              <View style={styles.servicesItemContainer}>
                <View style={{ marginTop: 1 }}>
                  <Ionicons
                    name='ios-checkmark-circle'
                    color={Theme.colors.primaryColor}
                    size={18}
                  />
                </View>
                <View style={styles.servicesItemTextContainer}>
                  <Text style={styles.servicesItemTitle}>{item.title}</Text>
                  <Text style={styles.servicesItemDesc}>{item.shortDescription}</Text>
                </View>
              </View>
            )}
            style={styles.departmentsFlatList}
          />
        </View>
        <Divider />
        <View style={styles.content}>
          <Text style={styles.sectionTitleText}>{getString('Recent Posts')}</Text>
          <FlatList
            data={model.newsPosts}
            keyExtractor={(item, index) => `key${index}ForNewsPost`}
            renderItem={({ item }) => <NewsPostItemRow item={item} />}
            style={{ marginTop: 12 }}
          />
        </View>
        <Divider />
        <View style={[styles.content, { paddingHorizontal: 0 }]}>
          <Text style={[styles.sectionTitleText, { marginStart: 16 }]}>{getString('Photos')}</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollImageList}
          >
            <View style={styles.viewContentImageList}>
              {model.images.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={`imageListItemKey${index}`}
                    onPress={() => {
                      setPhotoViewerConfig({
                        selectedPhotoIndex: index,
                        isShowed: true,
                      });
                    }}
                  >
                    <Image
                      style={styles.imagesItem}
                      source={{
                        uri: item.imageUrl,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <PhotoViewerModal
        items={model.images}
        selectedImageIndex={photoViewerConfig.selectedPhotoIndex}
        visible={photoViewerConfig.isShowed}
        onSwipeDown={() => {
          setPhotoViewerConfig({
            ...photoViewerConfig,
            isShowed: false,
          });
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerImage: {
    height: 180,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.black,
  },
  shortDescText: {
    fontWeight: '600',
    color: Theme.colors.black,
    marginTop: 12,
  },
  htmlContent: { marginTop: 8 },
  departmentsFlatList: { marginTop: 12 },
  sectionTitleText: {
    fontWeight: '600',
    fontSize: 15,
    color: Theme.colors.black,
  },
  servicesItemContainer: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  servicesItemTextContainer: {
    flex: 1,
    marginStart: 12,
  },
  servicesItemTitle: {
    color: Theme.colors.black,
    fontSize: 15,
  },
  servicesItemDesc: {
    fontSize: 13,
    color: Theme.colors.gray,
    marginTop: 2,
  },
  scrollImageList: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  viewContentImageList: {
    flexDirection: 'row',
  },
  imagesItem: {
    width: 100,
    height: 100,
    marginHorizontal: 4,
    borderRadius: 12,
  },
});

import React, { useRef, useState } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Divider, TouchableHighlight } from '../../components';
import { Theme } from '../../theme';
import { useLocalization } from '../../localization';
import { SettingsBottomSheet } from '../../modals';
import NavigationNames from '../../navigations/NavigationNames';
import { useNavigation } from '@react-navigation/native';

const getMenuItems = (getString: (key: string) => string) => [
  // {
  //   title: getString('Events'),
  //   iconName: 'ios-musical-notes',
  //   navigateToScreen: NavigationNames.EventListScreen,
  // },
  // {
  //   title: getString('Blog'),
  //   iconName: 'ios-book',
  // },
  // {
  //   title: getString('Youtube'),
  //   iconName: 'logo-youtube',
  // },
  // {
  //   title: getString('Instagram'),
  //   iconName: 'logo-instagram',
  // },
  {
    title: getString('About Us'),
    iconName: 'ios-business',
  },
  {
    title: getString('Contact Us'),
    iconName: 'ios-call',
  },
  {
    title: getString('Write to Us'),
    iconName: 'ios-chatbubbles',
  },
  {
    title: getString('Settings'),
    iconName: 'md-settings',
    openSettings: true,
  },
];

type TProps = {};

export const MenuScreen: React.FC<TProps> = (props) => {
  const navigation = useNavigation();
  const { getString } = useLocalization();

  const [isVisibleSettingModal, setIsVisibleSettingModal] = useState(false);
  const menuItems = getMenuItems(getString);

  const onPressMenuItemClick = (item: any) => {
    if (item.openSettings) {
      setIsVisibleSettingModal(true);
    } else if (item.navigateToScreen) {
      navigation.navigate(item.navigateToScreen);
    }
  };

  return (
    <>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => `key${index}ForMenu`}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => onPressMenuItemClick(item)}>
            <View style={styles.itemContainer}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name={item.iconName}
                  size={24}
                  color={Theme.colors.gray}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.titleText}>{item.title}</Text>
              <Ionicons name='ios-arrow-forward' size={24} color={Theme.colors.gray} />
            </View>
          </TouchableHighlight>
        )}
        ItemSeparatorComponent={() => <Divider />}
      />
      <SettingsBottomSheet
        isVisible={isVisibleSettingModal}
        onDismissModal={() => setIsVisibleSettingModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 18,
    paddingEnd: 18,
    paddingStart: 0,
  },
  iconContainer: {
    width: 60,
    alignSelf: 'center',
  },
  icon: { alignSelf: 'center' },
  titleText: {
    flex: 1,
    alignSelf: 'center',
    color: Theme.colors.black,
    fontSize: 17,
  },
});

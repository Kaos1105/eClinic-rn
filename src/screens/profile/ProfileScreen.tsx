import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Divider, TouchableHighlight } from '../../components';
import { Theme } from '../../theme';
import { useLocalization } from '../../localization';
import NavigationNames from '../../navigations/NavigationNames';
import { useNavigation } from '@react-navigation/native';
import { RootStoreContext } from 'stores/rootStore';
import { observer } from 'mobx-react-lite';

type TProps = {};

export const ProfileScreen: React.FC<TProps> = observer((props) => {
  //State
  const { getString } = useLocalization();
  const profilesOption = [
    {
      title: getString('My Profile'),
      subtitle: getString('Update profile'),
      iconName: 'person',
      iconColor: Theme.colors.primaryColor,
      navigateToScreen: NavigationNames.UserProfile,
    },
    {
      title: getString('Calendar'),
      subtitle: getString('Appointments'),
      iconName: 'md-calendar',
      iconColor: '#2D9CDB',
      navigateToScreen: NavigationNames.CalendarScreen,
    },
    {
      title: getString('Notifications'),
      subtitle: getString('Show All Notifications'),
      iconName: 'md-notifications',
      iconColor: '#F2994A',
    },
    {
      title: getString('Log Out'),
      subtitle: getString('Required Sign In'),
      iconName: 'log-out',
      iconColor: '#050505',
      navigateToScreen: NavigationNames.SignInScreen,
    },
  ];

  const navigation = useNavigation();
  //Store
  const rootStore = useContext(RootStoreContext);
  const { logout, user } = rootStore.fireBaseAuthStore;
  const { currentUser } = rootStore.usersStore;

  const onPressMenuItemClick = (item: typeof profilesOption[0]) => {
    if (item.navigateToScreen) {
      if (item.navigateToScreen === NavigationNames.SignInScreen) {
        Alert.alert(getString('Logout'), getString('Are you sure to log out ?'), [
          {
            text: getString('Cancel'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              logout();
            },
          },
        ]);
        return;
      }
      navigation.navigate(item.navigateToScreen);
    }
  };

  return (
    <SafeAreaView style={styles.flex1}>
      <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.daysText}>{getString('Hello')}</Text>
        <Text style={styles.nameText}>
          {currentUser ? currentUser.fullName : user?.phoneNumber}
        </Text>

        <View style={{ marginTop: 24 }}>
          {profilesOption.map((item, index) => {
            return (
              <TouchableHighlight key={index} onPress={() => onPressMenuItemClick(item)}>
                <View>
                  <View style={styles.menuRowContent}>
                    <View style={styles.iconContent}>
                      <Ionicons
                        name={item.iconName}
                        size={26}
                        color={item.iconColor}
                        style={{ alignSelf: 'center' }}
                      />
                    </View>
                    <View style={styles.menuRowsContent}>
                      <Text style={styles.menuRowTitle}>{item.title}</Text>
                      <Text style={styles.menuRowSubtitle}>{item.subtitle}</Text>
                    </View>
                    <Ionicons
                      name='ios-arrow-forward'
                      size={24}
                      color={Theme.colors.primaryColor}
                      style={{ alignSelf: 'center' }}
                    />
                  </View>
                  <Divider style={styles.divider} />
                </View>
              </TouchableHighlight>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  scrollContainer: { paddingVertical: 16 },
  imageStyle: {
    width: 130,
    height: 130,
    borderRadius: 36,
    borderColor: Theme.colors.primaryColor,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 36,
  },
  nameText: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '600',
    marginTop: 6,
    color: Theme.colors.black,
  },
  daysText: {
    alignSelf: 'center',
    fontSize: 14,
    marginTop: 6,
    color: Theme.colors.black,
  },
  menuRowContent: {
    flexDirection: 'row',
    paddingStart: 12,
    paddingEnd: 16,
    paddingVertical: 16,
  },
  iconContent: {
    width: 32,
  },
  menuRowsContent: { paddingHorizontal: 8, flex: 1 },
  menuRowTitle: {
    fontSize: 17,
  },
  menuRowSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  divider: { marginStart: 46 },
});

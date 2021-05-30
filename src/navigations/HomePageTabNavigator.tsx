import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Theme } from '../theme';
import NavigationNames from './NavigationNames';
import { useLocalization } from '../localization';
import { stackScreenOptions, tabScreenOptions } from './NavigationHelper';
import {
  HomeScreen,
  ProfileScreen,
  MenuScreen,
  CalendarScreen,
  // MediaScreen,
  ClinicListScreen,
  ClinicDetailScreen,
  DepartmentListScreen,
  DepartmentDetailScreen,
  // MediaDetailScreen,
  NewAppointmentScreen,
  DoctorListScreen,
  DoctorDetailScreen,
  EventListScreen,
  SignInScreen,
  AppointmentScreen,
  AppointmentItemEdit,
  UserProfile,
} from '../screens';
import { ToolbarBrandLogo } from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode='screen' screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.HomeScreen}
        component={HomeScreen}
        options={{ headerTitle: () => <ToolbarBrandLogo /> }}
      />
      <Stack.Screen
        name={NavigationNames.ClinicListScreen}
        component={ClinicListScreen}
        options={{ title: getString('Campaigns') }}
      />
      <Stack.Screen
        name={NavigationNames.ClinicDetailScreen}
        component={ClinicDetailScreen}
        options={({ route }) => ({ title: route.params['title'] })}
      />
      <Stack.Screen
        name={NavigationNames.DepartmentListScreen}
        component={DepartmentListScreen}
        options={{ title: getString('Our Departments') }}
      />
      <Stack.Screen
        name={NavigationNames.DepartmentDetailScreen}
        component={DepartmentDetailScreen}
        options={({ route }) => ({ title: route.params['title'] })}
      />
      <Stack.Screen
        name={NavigationNames.NewAppointmentScreen}
        component={NewAppointmentScreen}
        options={{ title: getString('New Appointment') }}
      />
      <Stack.Screen
        name={NavigationNames.DoctorListScreen}
        component={DoctorListScreen}
        options={{ title: getString('Doctors') }}
      />
      <Stack.Screen name={NavigationNames.DoctorDetailScreen} component={DoctorDetailScreen} />
    </Stack.Navigator>
  );
};

const CalendarTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode='screen' screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.CalendarScreen}
        component={CalendarScreen}
        options={{ title: getString('Calendar') }}
      />
      <Stack.Screen
        name={NavigationNames.NewAppointmentScreen}
        component={NewAppointmentScreen}
        options={{ title: getString('New Appointment') }}
      />
      <Stack.Screen name={NavigationNames.DoctorDetailScreen} component={DoctorDetailScreen} />
    </Stack.Navigator>
  );
};

// const MediaTabStack = () => {
//   const { getString } = useLocalization();
//   return (
//     <Stack.Navigator headerMode='screen' screenOptions={stackScreenOptions}>
//       <Stack.Screen
//         name={NavigationNames.MediaScreen}
//         component={MediaScreen}
//         options={{ title: getString('Media') }}
//       />
//       <Stack.Screen
//         name={NavigationNames.MediaDetailScreen}
//         component={MediaDetailScreen}
//         options={{ title: getString('Media') }}
//       />
//     </Stack.Navigator>
//   );
// };

const ProfileTabStack = () => {
  return (
    <Stack.Navigator headerMode='screen' screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.ProfileScreen}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationNames.UserProfile}
        component={UserProfile}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

const MenuTabStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator headerMode='screen' screenOptions={stackScreenOptions}>
      <Stack.Screen
        name={NavigationNames.MenuScreen}
        component={MenuScreen}
        options={{ title: getString('Menu') }}
      />
      <Stack.Screen
        name={NavigationNames.EventListScreen}
        component={EventListScreen}
        options={{ title: getString('Events') }}
      />
      <Stack.Screen
        name={NavigationNames.SignInScreen}
        component={SignInScreen}
        options={{ title: getString('Sign In') }}
      />
      <Stack.Screen
        name={NavigationNames.AppointmentScreen}
        component={AppointmentScreen}
        options={{ title: getString('Appointment Screen') }}
      />
      <Stack.Screen
        name={NavigationNames.AppointmentItemEdit}
        component={AppointmentItemEdit}
        options={{ title: getString('Appointment Edit') }}
      />
    </Stack.Navigator>
  );
};

const HomePageTabNavigator = () => (
  <Tab.Navigator
    screenOptions={tabScreenOptions}
    tabBarOptions={{
      activeTintColor: Theme.colors.primaryColor,
      inactiveTintColor: Theme.colors.gray,
    }}
  >
    <Tab.Screen name={NavigationNames.HomeTab} component={HomeTabStack} />
    <Tab.Screen name={NavigationNames.CalendarTab} component={CalendarTabStack} />
    {/* <Tab.Screen name={NavigationNames.MediaTab} component={MediaTabStack} /> */}
    <Tab.Screen name={NavigationNames.ProfileTab} component={ProfileTabStack} />
    <Tab.Screen name={NavigationNames.MenuTab} component={MenuTabStack} />
  </Tab.Navigator>
);

// const AuthStackNavigator = createStackNavigator();

// export const AuthNavigator = () => {
//   const { getString } = useLocalization();
//   return (
//     <AuthStackNavigator.Navigator screenOptions={{}}>
//       <AuthStackNavigator.Screen
//         name={NavigationNames.SignInScreen}
//         component={SignInScreen}
//         options={{ title: getString('Sign In') }}
//       />
//     </AuthStackNavigator.Navigator>
//   );
// };

export default HomePageTabNavigator;

import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePageTabNavigator from './HomePageTabNavigator';
import { RootNavigation } from '../navigations';
import { RootStoreContext } from 'stores/rootStore';
import { observer } from 'mobx-react-lite';
import { SignInScreen, SplashScreen } from '../screens';
import Toast from 'react-native-toast-message';
import LoginModel from 'models/Login/loginModel';
import AppConsts from '../lib/appconst';
import { Alert } from 'react-native';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const [appLoaded, setAppLoaded] = useState(false);
  const {
    fireBaseToken,
    loadAsyncStorage,
    toastToggle,
    getToast,
    fireBaseRefreshToken,
    setToastData,
  } = rootStore.commonStore;
  const { getUser, checkExpireTime, isLoggedIn, user, logout, getRefreshToken } =
    rootStore.fireBaseAuthStore;
  const { login } = rootStore.authenticationStore;

  const initialRun = async () => {
    //login as Admin
    let loginModel = new LoginModel();
    loginModel.userNameOrEmailAddress = AppConsts.adminCredential.userName;
    loginModel.password = AppConsts.adminCredential.password;
    loginModel.rememberMe = true;
    let loggedIn = await login(loginModel).catch((error) => {
      Alert.alert('Error', 'Can not connect to server');
    });

    //login firebase
    let asyncStorageLoaded = await loadAsyncStorage();
    if (asyncStorageLoaded && loggedIn) {
      checkExpireTime();
      if (fireBaseToken) {
        try {
          await getUser(fireBaseToken).catch(() => logout());
          setAppLoaded(true);
        } catch (error) {}
      } else if (fireBaseToken === null) {
        await getRefreshToken(fireBaseRefreshToken).catch((error) => {
          Alert.alert('Token expire', 'Please try to login again');
          setAppLoaded(true);
        });
      }
    }
  };

  useEffect(() => {
    initialRun();
  }, [fireBaseToken]);

  useEffect(() => {
    if (toastToggle) {
      let toastData = getToast();
      Toast.show(toastData);
    }
  }, [toastToggle]);

  if (!appLoaded) return <SplashScreen />;

  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      {isLoggedIn && user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'Root'} component={HomePageTabNavigator} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'SignIn'} component={SignInScreen} />
        </Stack.Navigator>
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};

export default observer(App);

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
  const { fireBaseToken, loadAsyncStorage, toastToggle, getToast, fireBaseRefreshToken } =
    rootStore.commonStore;
  const { getUser, checkExpireTime, isLoggedIn, user, logout, getRefreshToken } =
    rootStore.fireBaseAuthStore;
  const { login } = rootStore.authenticationStore;

  const [loggedInServer, setLoggedInServer] = useState(false);

  const logInFirebase = async () => {
    //login firebase
    let initialLoad = await loadAsyncStorage();
    if (initialLoad) {
      const isExpiredTime = checkExpireTime();
      if (!isExpiredTime) {
        await getUser(fireBaseToken).catch(() => logout());
        setAppLoaded(true);
      } else {
        logout();
        await getRefreshToken(fireBaseRefreshToken).catch((error) => {
          Alert.alert('Token expire', 'Please try to login again');
          setAppLoaded(true);
        });
      }
    }
  };

  const logInBackend = async () => {
    //login as Admin
    let loginModel = new LoginModel();
    loginModel.userNameOrEmailAddress = AppConsts.adminCredential.userName;
    loginModel.password = AppConsts.adminCredential.password;
    loginModel.rememberMe = true;
    let loggedIn = await login(loginModel).catch((error) => {
      Alert.alert('Error', 'Can not connect to server');
    });
    setLoggedInServer(loggedInServer);
  };

  useEffect(() => {
    logInBackend();
  }, []);

  useEffect(() => {
    logInFirebase();
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

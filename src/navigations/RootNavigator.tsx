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

    //login firebase
    let asyncStorageLoaded = await loadAsyncStorage();
    if (asyncStorageLoaded) {
      checkExpireTime();
      if (fireBaseToken) {
        try {
          await getUser(fireBaseToken).catch(() => logout());
          await login(loginModel).catch((error) => {
            Alert.prompt('Error', 'Can not connect to server');
          });
          setAppLoaded(true);
        } catch (error) {}
      } else if (fireBaseToken === null) {
        await getRefreshToken(fireBaseRefreshToken).catch((error) => {
          Alert.prompt('Token expire', 'Please try to login again');
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

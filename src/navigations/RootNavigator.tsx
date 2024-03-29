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
import { LoadingModal } from '../components/ui';
import { useLocalization } from '../localization';

const Stack = createStackNavigator();

const App: React.FC = () => {
  //Hook
  const { getString } = useLocalization();

  const rootStore = useContext(RootStoreContext);
  const { fireBaseToken, loadAsyncStorage, toastToggle, getToast, fireBaseRefreshToken } =
    rootStore.commonStore;
  const { getUser, checkExpireTime, isLoggedIn, user, getRefreshToken } =
    rootStore.fireBaseAuthStore;
  const { login } = rootStore.authenticationStore;
  const { getUser: getProfile } = rootStore.usersStore;

  const [loggedInServer, setLoggedInServer] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);

  const logInFirebase = async () => {
    //login firebase
    let initialLoad = await loadAsyncStorage();
    if (initialLoad) {
      checkExpireTime();
      if (fireBaseToken) {
        let resp = await getUser(fireBaseToken);
        await getProfile(resp.phoneNumber);
        setAppLoaded(true);
      } else if (fireBaseToken === null) {
        await getRefreshToken(fireBaseRefreshToken).catch((error) => {
          Alert.alert(getString('Please enter your phone number'));
        });
        setAppLoaded(true);
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
      Alert.alert(getString('Error'), getString('Can not connect to server'));
    });
    setLoggedInServer(true);
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

  if (!appLoaded && !loggedInServer) return <SplashScreen />;

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
      <LoadingModal />
    </NavigationContainer>
  );
};

export default observer(App);
